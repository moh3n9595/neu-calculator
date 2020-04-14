/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState, useCallback } from 'react';
// @ts-ignore
import * as StringMath from 'string-math';
import styles from './Home.css';
import Button from './Button';

export default function Home() {
  const [exp, setExp] = useState('');
  const [noDispExp, setNoDispExp] = useState('');
  const [calced, setCalced] = useState('');

  const setAllExps = useCallback(
    (char: string, dispChar = false) => {
      setNoDispExp(noDispExp + char);
      setExp(`${exp}${dispChar || char}`);
    },
    [exp, noDispExp, calced]
  );

  const clear = useCallback(() => {
    setExp('');
    setNoDispExp('');
    setCalced('');
  }, [exp, noDispExp, calced]);

  const clearLastChar = useCallback(() => {
    setExp(exp.slice(0, -1));
    setNoDispExp(noDispExp.slice(0, -1));
    setCalced('');
  }, [exp, noDispExp, calced]);

  const calc = useCallback(() => {
    try {
      setCalced(StringMath(noDispExp));
    } catch {
      setCalced('Invalid input');
    }
  }, [exp, noDispExp, calced]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const keyName = e.key;

      if (/\d/.test(keyName)) {
        setAllExps(keyName);
      } else if (['-', '+'].includes(keyName)) {
        setAllExps(keyName);
      } else if (keyName === '/') {
        setAllExps('/', '÷');
      } else if (keyName === '*') {
        setAllExps('*', '×');
      } else if (keyName === 'Backspace' || keyName === 'Delete') {
        clearLastChar();
      } else if (keyName === 'Clear') {
        clear();
      } else if (keyName === 'Enter') {
        calc();
      }
    },
    [exp, noDispExp, calced]
  );

  const expRendered = () => {
    const signsArr = ['+', '-', '×', '÷', '(', ')'];
    let newExp = '';
    for (let i = 0; i < exp?.length; i += 1) {
      if (signsArr.includes(exp[i]))
        newExp += `<span class="${styles.sign}">${exp[i]}</span>`;
      else newExp += exp[i];
    }
    return newExp;
  };

  return (
    <div
      className={styles.container}
      data-tid="container"
      onKeyDown={handleKeyDown}
      role="button"
      ref={ref => ref?.focus()}
      tabIndex={-1}
    >
      <div className={styles.top}>
        <span
          className={styles.inCalc}
          dangerouslySetInnerHTML={{ __html: expRendered() }}
        />
        <span className={styles.calced}>{calced}</span>
      </div>
      <div className={styles.row}>
        <Button char="C" bg="rgb(248,204,204)" onPress={() => clear()} />
        <Button char="(" onPress={() => setAllExps(`(`)} />
        <Button char=")" onPress={() => setAllExps(`)`)} />
        <Button
          char="/"
          dispChar="÷"
          bg="rgb(255,238,190)"
          onPress={() => setAllExps(`/`, `÷`)}
        />
      </div>

      <div className={styles.row}>
        <Button char="7" onPress={() => setAllExps(`7`)} />
        <Button char="8" onPress={() => setAllExps(`8`)} />
        <Button char="9" onPress={() => setAllExps(`9`)} />
        <Button
          char="×"
          bg="rgb(255,238,190)"
          onPress={() => setAllExps(`*`, `×`)}
        />
      </div>

      <div className={styles.row}>
        <Button char="4" onPress={() => setAllExps(`4`)} />
        <Button char="5" onPress={() => setAllExps(`5`)} />
        <Button char="6" onPress={() => setAllExps(`6`)} />
        <Button
          char="-"
          bg="rgb(255,238,190)"
          onPress={() => setAllExps(`-`)}
        />
      </div>

      <div className={styles.row}>
        <Button char="1" onPress={() => setAllExps(`1`)} />
        <Button char="2" onPress={() => setAllExps(`2`)} />
        <Button char="3" onPress={() => setAllExps(`3`)} />
        <Button
          char="+"
          bg="rgb(255,238,190)"
          onPress={() => setAllExps(`+`)}
        />
      </div>

      <div className={styles.row}>
        <Button char="0" isLong onPress={() => setAllExps(`0`)} />
        <Button char="." onPress={() => setAllExps(`.`)} />
        <Button char="=" bg="rgb(203,246,192)" onPress={() => calc()} />
      </div>
    </div>
  );
}
