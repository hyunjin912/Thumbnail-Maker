import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getImage } from "../api";
import styled, { css, keyframes } from "styled-components";

function Maker() {
  const [image, setImage] = useState({
    src: "",
    alt: "",
  });
  const { thumbId } = useParams();

  useEffect(() => {
    console.log("thumb Effect");

    const fetchData = async () => {
      const re = await getImage(thumbId);

      const img = new Image();
      img.src = re.urls.full;
      img.onload = () => {
        console.log("썸브 로딩 완료");
        setImage({
          src: re.urls.full,
          alt: re.alt_description,
        });
      };
    };

    if (thumbId) {
      fetchData();
    }
  }, [thumbId]);

  return (
    <>
      {/* <Wrap>
        <ThumbWrap>
          <Thumb $url={img.src} />
        </ThumbWrap>
      </Wrap> */}
      <div className="maker_wrap">
        <div className={image.src ? "thumb_wrap" : "thumb_wrap skeleton"}>
          {image.src && <img src={image.src} alt={image.alt} />}
        </div>
      </div>
    </>
  );
}

const sk = () => {
  const skeleton_loader = keyframes`
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
`;

  const animation = css`
    ${skeleton_loader} 2s infinite;
  `;

  const skeleton = css`
    overflow: hidden;
    background-color: #fdc000;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(
        270deg,
        rgba(255, 255, 255, 0),
        rgba(243, 133, 24, 0.7),
        rgba(255, 255, 255, 0)
      );
      transform: translateX(-100%);
    }
  `;

  const Wrap = styled.div`
    padding: 20px;
  `;

  const ThumbWrap = styled.div`
    position: relative;
    box-sizing: border-box;
    max-width: 788px;
    margin: 0 auto;

    &::after {
      content: "";
      display: block;
      padding-top: 56.25%;
    }
  `;

  const Thumb = styled.div`
    position: absolute;
    inset: 0;

    ${(props) =>
      props.$url
        ? css`
            background: url(${props.$url}) center center / cover;
          `
        : skeleton}
    ${(props) =>
      props.$url
        ? ""
        : css`
            &::after {
              animation: ${animation};
            }
          `}
  `;
};

export default Maker;
