import { useState, useEffect, useRef } from "react";
import Spinner from "./Spinner";
import { getImage } from "../api";
import styled, { css, keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

function calc(e) {
  const exCludeVal = Math.floor(e.currentTarget.getBoundingClientRect().left);
  const wid = Math.floor(e.currentTarget.getBoundingClientRect().width);
  const clientX = "ontouchstart" in window ? e.touches[0].clientX : e.clientX;
  const range = (Math.floor(clientX) - exCludeVal) / wid;
  const leftValue = Math.min(
    wid,
    Math.max(0, Math.floor(clientX) - exCludeVal),
  );
  const opacityValue = Math.min(1, Math.max(0, range));

  return {
    opacity: opacityValue.toFixed(2) * 1,
    left: (leftValue / wid) * 100,
  };
}

function Maker({ id, setOpen }) {
  const navigate = useNavigate();
  const [makingCanvas, setMakingCanvas] = useState(false);
  const [image, setImage] = useState({
    src: "",
    alt: "",
  });
  const [input, setInput] = useState({
    main: "",
    sub: "",
    opacity: 0,
    left: 0,
    reverse: "false",
  });
  const [trigger, setTrigger] = useState(false);
  const preview = useRef(null);
  const onReverse = (e) => {
    const { value } = e.target;
    setInput((prev) => ({
      ...prev,
      reverse: value,
    }));
  };
  const onTriggerStart = (e) => {
    if ("ontouchstart" in window && e.type === "mousedown") return;
    setTrigger(true);
    const leftAndOpaticy = calc(e);
    setInput((prev) => ({
      ...prev,
      ...leftAndOpaticy,
    }));
  };
  const onMove = (e) => {
    if ("ontouchmove" in window && e.type === "mousemove") return;
    if (trigger) {
      const leftAndOpaticy = calc(e);
      setInput((prev) => ({
        ...prev,
        ...leftAndOpaticy,
      }));
    }
  };
  const onTriggerStop = (e) => {
    if ("ontouchend" in window && e.type === "mouseup") return;
    setTrigger(false);
  };
  const onReset = () => {
    setInput({
      main: "",
      sub: "",
      opacity: 0,
      left: 0,
      reverse: "false",
    });
  };
  const onChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };
  const onClose = () => {
    setOpen(false);
  };
  const onDownload = async () => {
    if (image.src.length <= 0) return;
    setMakingCanvas(true);

    const opt = {
      allowTaint: true,
      useCORS: true,
    };
    const canvas = await html2canvas(preview.current, opt);
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "maker.png";
    a.click();
    // const win = window.open();
    // win.document.write(`<img src=${canvas.toDataURL("image/png")}>`);

    setMakingCanvas(false);
  };

  useEffect(() => {
    console.log("thumb Effect");

    document.body.style.overflow = "hidden";

    const fetchData = async () => {
      try {
        const re = await getImage(id);
        const img = new Image();
        img.src = re.urls.full;
        img.onload = () => {
          console.log("썸브 로딩 완료");
          setImage({
            src: re.urls.full,
            alt: re.alt_description,
          });
        };
      } catch (e) {
        window.alert("예기치 못한 에러가 발생하여 메인 화면으로 이동됩니다.");
        navigate("/");
      }
    };

    fetchData();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      {/* <Wrap>
        <ThumbWrap>
          <Thumb $url={img.src} />
        </ThumbWrap>
      </Wrap> */}
      <SpinnerWrap $makingCanvas={makingCanvas}>
        <Spinner />
      </SpinnerWrap>
      <div
        className={
          input.reverse === "true" ? "interface color_reverse" : "interface"
        }
      >
        <div className="interface__inner">
          <div
            ref={preview}
            className={image.src ? "interface__preview" : "interface__preview skeleton"}
          >
            <span
              className="interface__preview-glass"
              style={{ opacity: input.opacity }}
            ></span>
            {image.src && <img src={image.src} alt={image.alt} />}
            <ul className="interface__texts">
              <li className="interface__texts-main">{input.main}</li>
              <li className="interface__texts-sub">{input.sub}</li>
            </ul>
          </div>
          <div className="interface__setting">
            <div className="interface__setting-inputs">
              <input
                className="interface__setting-main"
                name="main"
                value={input.main}
                onChange={onChange}
                type="text"
                placeholder="제목을 입력하세요."
                autoComplete="off"
              />
              <input
                className="interface__setting-sub"
                name="sub"
                value={input.sub}
                onChange={onChange}
                type="text"
                placeholder="부제목을 입력하세요."
                autoComplete="off"
              />
              <div className="interface__line interface__line-opacity">
                <div className="interface__label interface__label-opacity">배경 명암</div>
                <div
                  className={trigger ? "interface__range dimmed" : "interface__range"}
                  onMouseDown={onTriggerStart}
                  onMouseMove={onMove}
                  onMouseUp={onTriggerStop}
                  onTouchStart={onTriggerStart}
                  onTouchMove={onMove}
                  onTouchEnd={onTriggerStop}
                >
                  <div className="interface__back">
                    <div
                      className="interface__front"
                      style={{ width: `${input.left}%` }}
                    ></div>
                  </div>
                  <span
                    className="interface__range-circle"
                    style={{ left: `${input.left}%` }}
                  ></span>
                </div>
              </div>
              <div className="interface__line interface__line-reverse">
                <div className="interface__label interface__label-reverse">색상 반전</div>
                <div className="interface__reverse">
                  <input
                    type="radio"
                    id="rdo1"
                    name="reverse"
                    className="interface__rdo-reverse sr_only"
                    value="true"
                    onChange={onReverse}
                    checked={input.reverse === "true"}
                  />
                  <label htmlFor="rdo1" className="interface__rdo-label">사용</label>
                  <input
                    type="radio"
                    id="rdo2"
                    name="reverse"
                    className="interface__rdo-reverse sr_only"
                    value="false"
                    onChange={onReverse}
                    checked={input.reverse === "false"}
                  />
                  <label htmlFor="rdo2" className="interface__rdo-label">미사용</label>
                </div>
              </div>
            </div>
            <div className="interface__setting-reset">
              <button className="interface__btn-reset" onClick={onReset}>
                Reset
              </button>
            </div>
          </div>
          <div className="interface__btns">
            <button className="interface__btn interface__close" onClick={onClose}>
              Close
            </button>
            <button className="interface__btn interface__download" onClick={onDownload}>
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const SpinnerWrap = styled.div`
  ${(props) =>
    props.$makingCanvas
      ? css`
          display: flex;
          justify-content: center;
          align-items: center;
        `
      : css`
          display: none;
        `}
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.5);
`;

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
