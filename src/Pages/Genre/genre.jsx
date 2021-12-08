import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchGenre } from "Redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import Movie from "components/Movie/Movie";
import imgUrl from "Request/imgUrl";
import { Grid } from "styles/Grid";
import Paginate from "components/Pagination/Paginate";
import Spinner from "components/Spinner/Spinner";

const Genre = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movies, moviesLoading } = useSelector((state) => state.movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchGenre(id, page));
  }, [dispatch, id, page]);

  const changePage = (page) => {
    setPage(page);
  };

  if (moviesLoading) return <Spinner />;

  return (
    <div>
      <Grid>
        {movies.results.map((item) => (
          <Movie
            key={item.id}
            title={item.title}
            img={imgUrl.small + item.poster_path}
            vote={item.vote_average}
            id={item.id}
          />
        ))}
      </Grid>

      <Paginate
        page={page}
        totalPage={movies.total_pages}
        changePage={changePage}
      />
    </div>
  );
};

export default Genre;
