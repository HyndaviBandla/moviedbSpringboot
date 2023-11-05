// Reviews is the parent of ReviewForm child
// use ref hook to reference the text area control with in the review form
// using useparams hook we can get the movie id parameter value from the relevant url

import { useEffect, useRef } from "react";
import api from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

import React from "react";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  // So when our component first loads, we want to call a method that is passed in as a prop to our
  // component in order to retrieve the appropriate data for the relevant movie that the user wishes to review. So we can use
  // the use effect hook like this for this purpose.
  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();

    const rev = revText.current;

    try {
      const response = await api.post("/api/v1/reviews", {
        reviewBody: rev.value,
        imdbId: movieId,
      });
      // And let's write code to update the state of the reviews array on the client side
      const updatedReviews = [...reviews, { body: rev.value }];
      // We also want to include code that clears the relevant text area control. Once the user has successfully submitted a review,
      rev.value = "";

      setReviews(updatedReviews);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      {/* Let's use React bootstrap components for example, the row and col components to create an appropriate layout for the
reviews component, we want to display the poster for the relevant movie in the left part of the screen and the reviews in
the right part of the screen we can use the row and col components appropriately to achieve this. */}
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r) => {
            return (
              <>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
