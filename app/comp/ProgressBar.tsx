import { css, keyframes } from "@emotion/css";
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const postDiverAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const progressInAnimation = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

interface ProgressBarProps {
  isOpen: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isOpen }) => {
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isOpen || !isClient) return null; // クライアントサイドでかつisOpenがtrueのときだけレンダリング

  return ReactDOM.createPortal(
    <div
      className={css`
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        height: 3px;
        background: #27c4f5
          linear-gradient(to right, #27c4f5, #a307ba, #fd8d32, #58c322, #27c4f5);
        width: 100%;
        background-size: 200% 200%;
        animation: ${postDiverAnimation} 2s linear infinite,
          ${progressInAnimation} 1s ease-in-out;
      `}
    ></div>,
    document.body
  );
};

export default ProgressBar;
