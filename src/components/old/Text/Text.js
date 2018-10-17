import React from 'react';

const TextBox = ({data}) => {
  let paragraf = data.map((text, idx) => {
    return <p key={idx} >{text}</p>;
  });

  return (
    <div>
      {paragraf}
    </div>
  );
};

export default TextBox;
