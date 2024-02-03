import React from 'react';

const DropdownMenu = () => {
  const handleMenuItemClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="dropdown-menu absolute">
      <ul className="ul-menu font-montserrat font-semibold">
        <li className="li-menu">
          <a onClick={() => handleMenuItemClick('Abstract')}>Abstract</a>
        </li>
        <li className="li-menu">
          <a onClick={() => handleMenuItemClick('Text')}>Text</a>
        </li>
        <li className="li-menu">
          <a onClick={() => handleMenuItemClick('Authors')}>Authors</a>
        </li>
        <li className="li-menu">
          <a onClick={() => handleMenuItemClick('Institutions')}>Institutions</a>
        </li>
        <li className="li-menu">
          <a onClick={() => handleMenuItemClick('References')}>References</a>
        </li>
        <li className="li-menu">
          <a onClick={() => handleMenuItemClick('Keywords')}>Key words</a>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
