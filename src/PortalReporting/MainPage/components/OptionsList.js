import React from 'react';

const OptionsList = ({className, data, action}) => {
  const values = data.map((e, index) => {
    return (
      <li className={className.li} key={`item-${index}`}>
        <a className={className.a} onClick={action ? action.bind(null, e.pagina) : null}>
          {e.pagina}
        </a>
      </li>
    );
  });
  return (
    <ul className={className.ul}>{values}</ul>
  );
};

export {
  OptionsList
};
