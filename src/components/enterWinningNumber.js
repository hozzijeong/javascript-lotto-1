import { LOTTO_LENGTH } from '../data/Constants';
import { keyUpEventListener } from '../utils/eventListener';
import {
  enterWinNumberMessage,
  numberEnterContainer,
  numberInput,
  numberTitleContainer,
  resultButton,
  winningNumberContainer,
} from '../view/templates/lottoGame';

export default function EnterWinningNumber($root, eventHandler) {
  this.state = {
    $root,
    winNumbers: [],
    bonusNumber: 0,
  };

  this.init = () => {
    paintEnterWinningNumber(this.state.$root);
  };
  this.render = () => {};
  this.setState = (state) => {
    this.state = { ...this.state, ...state };
  };

  const addEnterWinningNumberEventListener = ($root) => {
    const $container = $root.querySelector('.number-container');
    const $button = $root.querySelector('#check-result');

    $container.addEventListener('keyup', (e) => keyUpEventListener(e, $button));
    $container.addEventListener('change', (e) => {
      const { name, value, dataset } = e.target;
      if (name === 'win-number') {
        this.state.winNumbers[dataset.idx] = Number(value);
      }

      if (name === 'bonus-number') {
        this.state.bonusNumber = Number(value);
      }
      console.log(this.state);
    });
  };

  const paintEnterWinningNumber = ($root) => {
    const $gameBoard = enterWinningNumber();
    $root.appendChild($gameBoard);

    addEnterWinningNumberEventListener($root);
    $gameBoard.addEventListener('submit', eventHandler);

    $gameBoard.querySelector('input[name=win-number]').focus();
  };

  const enterWinningNumber = () => {
    const $enterBoard = document.createElement('form');

    $enterBoard.innerHTML = `
      ${enterWinNumberMessage}
      ${numberTitleContainer}
      ${winNumberEnterContainer()}
      ${resultButton}
    `;

    return $enterBoard;
  };

  const winningNumberInputs = () => {
    const $$input = Array.from({ length: LOTTO_LENGTH })
      .map((_, idx) => numberInput({ name: 'win-number', idx }))
      .join('');

    return $$input;
  };

  const winNumberEnterContainer = () => {
    const $winNumberContainer = winningNumberContainer(winningNumberInputs());
    const $bonusNumberInput = numberInput({ name: 'bonus-number' });

    return numberEnterContainer($winNumberContainer, $bonusNumberInput);
  };

  this.init();
}
