import * as React from "react";
import Svg, { Path } from "react-native-svg";
const UploadSvg = () => (
    <Svg
        width={24}
        height={24}
        fill="none"
        stroke="#FAFAFA"
        viewBox="0 0 24 24"
    >
        <Path
            stroke="#FAFAFA"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 10V9a5 5 0 0 1 10 0v1a4 4 0 0 1 4 4c0 1.48-.804 2.808-2 3.5M7 10a4 4 0 0 0-4 4c0 1.48.804 2.808 2 3.5M7 10a4 4 0 0 1 1.24.196M12 12v9m0-9 3 3m-3-3-3 3"
        />
    </Svg>
);
export default UploadSvg;
