import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { getMovies, IGetMoviesResult, topMovies, upcomingMovie } from "../api";
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

const SliderTitle = styled.div`
  font-size: 32px;
  font-weight: 600;  
`;

const offset = 6; //한페이지에 보이는 개수

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  // console.log(bigMovieMatch);
  const { scrollY } = useViewportScroll();
  const { data, isLoading: nowLoading} = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"], 
    getMovies);
  const { data: topMovieData, isLoading: topMovieLoading,
    } = useQuery<IGetMoviesResult>(['movie', 'topMovie'], topMovies);
  const { data: upcomingData, isLoading: upcomingLoading,
    } = useQuery<IGetMoviesResult>(['movie', 'upcoming'], upcomingMovie);  
  // console.log(data, isLoading);
  const [index, setIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [upIndex, setUpIndex] = useState(0);
  // const incraseIndex = () => setIndex((prev) => prev + 1);
  const [leaving, setLeaving] = useState(false);
  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const upInCreseIndex = () => {
    if (upcomingData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = upcomingData?.results.length - 2;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setUpIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const topIncreseIndex = () => {
    if (topMovieData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = topMovieData?.results.length - 2;

      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setTopIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/");
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

    const isLoading = nowLoading || topMovieLoading || upcomingLoading;
return (
  <Wrapper>
      {isLoading ? (<Loader>Loading...</Loader>) : (
      <>
        <Banner
            // onClick={incraseIndex}
            bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
        >
          <Title>{data?.results[0].title}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </Banner> 
          <Slider>
            <SliderTitle>상영중인 영화</SliderTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                    layoutId={movie.id + ""}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgPhoto={
                        movie.backdrop_path
                        ? makeImagePath(movie.backdrop_path, 'w500')
                        : noPoster
                    }
                      >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <ArrowBtn onClick={incraseIndex}>
            💨
            </ArrowBtn>
          </Slider>
{/* 커밍슬라이더 */}
          <UpcomingSlide>
            <SliderTitle>개봉예정 영화</SliderTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
                key={upIndex}
              >
                {upcomingData?.results
                  .slice(2)
                  .slice(offset * upIndex, offset * upIndex + offset)
                  .map((movie) => (
                    <Box
                      layoutId={String(movie.id)}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(movie.id)}
                      bgPhoto={
                        movie.backdrop_path
                        ? makeImagePath(movie.backdrop_path, 'w500')
                        : noPoster
                      }
                      // bgPhoto={makeImagePath(
                      //   movie.backdrop_path
                      //     ? movie.backdrop_path
                      //     : ( movie.poster_path ? movie.poster_path : noPoster)
                      //     ,
                      //   "w500"
                      // )}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <ArrowBtn onClick={upInCreseIndex}>
            💨
            </ArrowBtn>
          </UpcomingSlide>          
{/* 평점탑영화 */}
<TopSlide>
            <SliderTitle>최고의 영화</SliderTitle>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: 'tween', duration: 1 }}
                key={topIndex}
              >
                {topMovieData?.results
                  .slice(2)
                  .slice(offset * topIndex, offset * topIndex + offset)
                  .map((movie) => (
                    <Box
                      layoutId={String(movie.id)}
                      key={movie.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      transition={{ type: 'tween' }}
                      onClick={() => onBoxClicked(movie.id)}
                      bgPhoto={makeImagePath(movie.backdrop_path, 'w500')}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <ArrowBtn onClick={topIncreseIndex}>
            💨
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
                layoutId={bigMovieMatch.params.movieId}
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
export default Home;