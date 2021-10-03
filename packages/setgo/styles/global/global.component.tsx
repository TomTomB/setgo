import React from 'react';
import { Misc } from './misc.global';
import { Scrollbar } from './scrollbar.global';
import { Typo } from './typo.global';

export const GlobalStyle = () => {
  return (
    <>
      <Typo />
      <Scrollbar />
      <Misc />
    </>
  );
};
