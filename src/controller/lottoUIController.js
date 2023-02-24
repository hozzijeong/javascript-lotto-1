import {
  paintEnterWinningNumber,
  getWinNumberAndBonusNumber,
} from '../components/enterGameBoard';
import {
  paintPurchaseAmountInput,
  getPurchaseAmount,
} from '../components/purchaseAmountInput';
import showErrorMessage from '../components/errorMessage';
import lottoResultBoard from '../components/lottoResult';
import paintModal, { closeModal } from '../components/modal';
import paintLottoStatus from '../components/purchaseLottoStatus';
import { STEP } from '../data/Constants';
import LottoGame from '../domain/LottoGame';
import {
  inputErrorChecker,
  printLottoResultErrorHandler,
  purchaseLottoErrorHandler,
} from '../utils/errorChecker';
import { clearConatiner } from '../utils/Utils';
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
} from '../utils/validator';

export default function LottoUIController($app) {
  this.state = {
    lottoGame: new LottoGame(),
    $root: null,
    step: STEP.INIT,
  };

  const init = () => {
    const $lottoSection = document.createElement('section');
    $lottoSection.className = 'lotto-section';

    $app.appendChild($lottoSection);

    this.state.$root = $lottoSection;
  };

  this.play = () => {
    gameSetting();
    paintPurchaseAmountInput(this.state.$root, purchaseAmountHandler);
  };

  const gameSetting = () => {
    this.state.lottoGame = new LottoGame();
    clearConatiner(this.state.$root);
  };

  const paintGameBoard = (purchaseAmount) => {
    const { $root, lottoGame } = this.state;
    this.state.step = STEP.ENTER;

    lottoGame.purchaseLottos(purchaseAmount);
    const lottos = lottoGame.getLottoNumbers();

    paintLottoStatus($root, lottos);
    paintEnterWinningNumber($root, checkResultHandler);
  };

  const paintResultView = ({ winCount, earningRate }) => {
    const $content = lottoResultBoard({ winCount, earningRate }, restart);

    paintModal($content);
  };

  const calculateResult = (bonusNumber, winningNumbers) => {
    const { lottoGame } = this.state;

    lottoGame.registerGameBoard(winningNumbers, bonusNumber);

    const winCount = lottoGame.getLottosWinCount();
    const earningRate = lottoGame.getEarningRate();

    paintResultView({ winCount, earningRate });
  };

  const purchaseAmountHandler = () => {
    const { $root, step } = this.state;

    const purchaseAmount = getPurchaseAmount();

    const { state, message } = inputErrorChecker(() =>
      validatePurchaseAmount(purchaseAmount)
    );

    if (state) {
      const { $errorContainer, $trigger } = purchaseLottoErrorHandler();
      showErrorMessage($errorContainer, message, $trigger);
      return;
    }

    if (step !== STEP.INIT) clearGameBoard($root);

    paintGameBoard(purchaseAmount);
  };

  const checkResultHandler = () => {
    const { winningNumbers, bonusNumber } = getWinNumberAndBonusNumber();

    const { state: winState, message: winMessage } = inputErrorChecker(() =>
      validateWinningNumbers(winningNumbers)
    );

    const { state: bonusState, message: bonusMessage } = inputErrorChecker(() =>
      validateBonusNumber(bonusNumber, winningNumbers)
    );

    if (bonusState || winState) {
      const message = winState ? winMessage : bonusMessage;
      const { $errorContainer, $trigger } = printLottoResultErrorHandler();
      showErrorMessage($errorContainer, message, $trigger);
      return;
    }

    calculateResult(bonusNumber, winningNumbers);
  };

  const clearGameBoard = ($root) => {
    $root.removeChild($root.lastChild);
    $root.removeChild($root.lastChild);
    this.state.step = STEP.INIT;
  };

  const restart = () => {
    closeModal();
    this.play();
  };

  init();
}
