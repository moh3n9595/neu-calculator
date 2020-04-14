/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './Button.css';

interface PropsInterface {
  char: string;
  isLong?: boolean;
  bg?: string;
  onPress?: Function;
  dispChar?: string;
}

export default function Button({
  char,
  dispChar = undefined,
  isLong = false,
  bg = undefined,
  onPress = () => {}
}: PropsInterface) {
  return (
    <div
      className={`${styles.btn} ${isLong ? styles.long : ''}`}
      style={{ backgroundColor: bg }}
      onClick={() => onPress()}
    >
      <span>{dispChar || char}</span>
    </div>
  );
}
