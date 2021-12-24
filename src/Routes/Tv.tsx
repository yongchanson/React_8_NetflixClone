import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { getPopularTv, getTopRatedTv, getTv, IGetTv } from '../api';
import { makeImagePath } from "../utils";
import { useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom";
import noPoster from '../Components/noPoster.png';
import Detail from '../Components/Detail';

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

// const Row = styled(motion.div)`
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const ArrowBtn = styled.div`
  width: 50px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
`;

const UpcomingSlide = styled.div`
  margin-top: 200px;
  position: relative;
`;
const TopSlide = styled.div`
  margin-top: 300px;
  position: relative;
`;
const BigGenres = styled.ul`
  display: flex;
  position: relative;
  top: -80px;
  padding: 20px;
`;
const Genre = styled.li`
  margin-right: 10px;
  background-color: red;
  font-size: 17px;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px 5px;
  transition: all 0.3s linear;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: white;
  }
`;

const offset = 6; //한페이지에 보이는 개수

function Tv() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ tvId: string }>('/tv/show/:tvId');
  // console.log(bigMovieMatch);
  const { scrollY } = useViewportScroll();
  const { data, isLoading: todayLoading } = useQuery<IGetTv>(
    ['tv', 'today'],
    getTv
  );
  const { data: popTvData, isLoading: popTvLoading } = useQuery<IGetTv>(
    ['tv', 'popular'],
    getPopularTv
  );
  const { data: topTvData, isLoading: topTvLoading } = useQuery<IGetTv>(
    ['tv', 'topRate'],
    getTopRatedTv
  );
  const [todayIndex, setTodayIndex] = useState(0);
  const [popIndex, setPopIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);

  const [leaving, setLeaving] = useState(false);
  const increaseToday = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalTv = data?.results.length - 2;
      const maxIndex = Math.floor(totalTv / offset) - 1;
      setTodayIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const increasePop = () => {
    if (popTvData) {
      if (leaving) return;
      toggleLeaving();
      const totalTv = popTvData?.results.length - 2;
      const maxIndex = Math.floor(totalTv / offset) - 1;
      setPopIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const increaseTop = () => {
    if (topTvData) {
      if (leaving) return;
      toggleLeaving();
      const totalTv = topTvData?.results.length - 2;
      const maxIndex = Math.floor(totalTv / offset) - 1;
      setTopIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (tvId: number) => {
    history.push(`/tv/${tvId}`);
  };
  const onOverlayClick = () => history.push("/tv");
  const clickedtv =
    bigMovieMatch?.params.tvId &&
    data?.results.find((tv) => tv.id === +bigMovieMatch.params.tvId);
  const isLoading = todayLoading || popTvLoading || topTvLoading;
  return (
  <Wrapper>
      {isLoading ? (<Loader>Loading...</Loader>) : (
      <>
        <Banner
            // onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
        >
          <Title>{data?.results[0].name}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </Banner> 
          <Slider>
          <h1>상영중인 tv</h1>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={todayIndex}
              >

                {data?.results
                  .slice(1)
                  .slice(offset * todayIndex, offset * todayIndex + offset)
                  .map((tv) => (
                    <Box
                    layoutId={tv.id + ""}
                      key={tv.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(tv.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={
                        tv.backdrop_path
                        ? makeImagePath(tv.backdrop_path, 'w500')
                        : noPoster
                    }
                      >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <ArrowBtn onClick={increaseToday}>
              화살표
            </ArrowBtn>
          </Slider>
{/* 커밍슬라이더 */}
          <UpcomingSlide>
            <h1>인기 tv</h1>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
                key={popIndex}
              >
                {popTvData?.results
                  .slice(2)
                  .slice(offset * popIndex, offset * popIndex + offset)
                  .map((tv) => (
                    <Box
                      layoutId={String(tv.id)}
                      key={tv.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(tv.id)}
                      bgPhoto={
                        tv.backdrop_path
                        ? makeImagePath(tv.backdrop_path, 'w500')
                        : noPoster
                      }
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <ArrowBtn onClick={increasePop}>
              화살표
            </ArrowBtn>
          </UpcomingSlide>          
{/* 평점탑영화 */}
<TopSlide>
            <h1>평점 탑 tv</h1>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
                key={topIndex}
              >
                {topTvData?.results
                  .slice(2)
                  .slice(offset * topIndex, offset * topIndex + offset)
                  .map((tv) => (
                    <Box
                      layoutId={String(tv.id)}
                      key={tv.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(tv.id)}
                      bgPhoto={makeImagePath(tv.backdrop_path, 'w500')}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <ArrowBtn onClick={increaseTop}>
              화살표
            </ArrowBtn>
          </TopSlide>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
              <Overlay
                onClick={onOverlayClick}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
              <BigMovie
                style={{ top: scrollY.get() + 100 }}
                layoutId={bigMovieMatch.params.tvId}
              >
                <Detail />
              </BigMovie>
            </>
            ) : null}
          </AnimatePresence>          
      </>
    )} 
  </Wrapper>
  );  
}
export default Tv;