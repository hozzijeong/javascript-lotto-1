import EnterWinningNumbers from './enterWinningNumber';
import PurchaseAmountInput from './purchaseAmountInput';
import showErrorMessage from '../view/errorMessage';
import paintLottoResultBoard from '../view/lottoResult';
import paintModal, {
  addCloseModalBackgroundEventListener,
  closeModal,
} from '../view/modal';
import LottoStatus from './purchaseLottoStatus';
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
import lottoSection from '../view/lottoSection';

export default function LottoWebGame($app) {
  this.state = {
    lottoGame: null,
    $root: null,
    step: STEP.INIT,
    purchaseInput: null,
    winNumber: null,
    lottoStatus: null,
  };

  const init = () => {
    const $lottoSection = lottoSection();
    $app.appendChild($lottoSection);
    addCloseModalBackgroundEventListener(closeHandler);

    this.state.$root = $lottoSection;
  };

  this.play = () => {
    gameSetting();
    const { $root } = this.state;

    this.state.purchaseInput = new PurchaseAmountInput(
      $root,
      purchaseAmountHandler
    );
  };

  const gameSetting = () => {
    this.state.lottoGame = new LottoGame();
    this.state.step = STEP.INIT;
    clearConatiner(this.state.$root);
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

  const closeHandler = () => {
    closeModal();
    this.state.step = STEP.ENTER;
  };

  const paintGameBoard = (purchaseAmount) => {
    const { $root, lottoGame } = this.state;

    this.state.step = STEP.ENTER;

    lottoGame.purchaseLottos(purchaseAmount);
    const lottos = lottoGame.getLottoNumbers();

    this.state.lottoStatus = new LottoStatus($root, lottos).init();
    this.state.winNumber = new EnterWinningNumbers($root, checkResultHandler);
  };

  const paintResultView = ({ winCount, earningRate }) => {
    const $content = paintLottoResultBoard(
      { winCount, earningRate },
      { restart, closeHandler }
    );

    paintModal($content);
  };

  const calculateResult = (bonusNumber, winningNumbers) => {
    const { lottoGame } = this.state;

    lottoGame.registerGameBoard(winningNumbers, bonusNumber);

    const winCount = lottoGame.getLottosWinCount();
    const earningRate = lottoGame.getEarningRate();

    paintResultView({ winCount, earningRate });
  };

  const purchaseAmountHandler = (e) => {
    e.preventDefault();
    const { $root, step, purchaseInput } = this.state;

    const purchaseAmount = purchaseInput.state.amount;

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

  const checkResultHandler = (e) => {
    e.preventDefault();
    const {
      step,
      winNumber: {
        state: { winNumbers, bonusNumber },
      },
    } = this.state;
    if (step !== STEP.ENTER) return;

    const { state: winState, message: winMessage } = inputErrorChecker(() =>
      validateWinningNumbers(winNumbers)
    );

    const { state: bonusState, message: bonusMessage } = inputErrorChecker(() =>
      validateBonusNumber(bonusNumber, winNumbers)
    );

    if (bonusState || winState) {
      const message = winState ? winMessage : bonusMessage;
      const { $errorContainer, $trigger } = printLottoResultErrorHandler();
      showErrorMessage($errorContainer, message, $trigger);
      return;
    }

    this.state.step = STEP.RESULT;
    calculateResult(bonusNumber, winNumbers);
  };

  init();
}
