import React from "react";

const Screen = ({ params }: { params: { screenid: string } }) => {
  return <div>Screen {params.screenid}</div>;
};

export default Screen;
