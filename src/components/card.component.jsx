import styled from "styled-components";

const Card = ({ setTurnCount, tile, setSelected, ShowBackSide, selected }) => {
  const handleFlip = id => {
    if (id !== selected.current.id) {
      setTurnCount(prevState => prevState + 1);

      setSelected(prevState => ({
        ...prevState,
        last: prevState.current,
        current: { url: tile.backSideURL, id: tile.id },
      }));
    }
  };

  return (
    <>
      {!tile.matched && (
        <Container ShowBackSide={ShowBackSide}>
          <div className="inner" onClick={() => handleFlip(tile.id)}>
            <div className="card-front">
              <img src={tile.frontSideURL} alt="front-side" />
            </div>
            <div className="card-back">
              <img src={tile.backSideURL} alt="back-side" />
            </div>
          </div>
        </Container>
      )}

      {tile.matched && (
        <Container cancelCard={tile.matched}>
          <div className="inner">
            <div className="card-back">
              <img src={tile.backSideURL} alt="back-side" />
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Card;

const Container = styled.div`
  height: 10rem;
  width: 10rem;
  cursor: pointer;
  background-color: transparent;
  perspective: 1000px;
  transform: ${props => (props.ShowBackSide || props.cancelCard ? "rotateY(180deg)" : "none")};

  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transform: ${props => (props.ShowBackSide || props.cancelCard ? "rotateY(180deg)" : "none")};
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .card-front {
  }

  .card-back {
    transform: rotateY(180deg);
  }
`;
