import { keyUpEventListener } from '../utils/eventListener';
import {
  gameTitle,
  purchaseAmountContainer,
} from '../view/templates/purchaseInput';

export default function PurchaseAmountInput($root, eventHandler) {
  this.state = {
    $root,
    amount: 0,
  };

  this.setState = (state) => {
    this.state = { ...this.state, ...state };
  };

  this.init = () => {
    paintPurchaseAmountInput(this.state.$root);
  };

  this.render = () => {};

  const addPurchaseEnterEventListener = () => {
    const { $root } = this.state;
    const $container = $root.querySelector('.purchase-amount-container');
    const $purchaseButton = $root.querySelector('#purchase-button');
    const $purchaseInput = $root.querySelector('#purchase-input');

    $purchaseInput.addEventListener('change', (e) => {
      const { value } = e.target;
      this.setState({ amount: Number(value) });
    });

    $container.addEventListener('keyup', (e) =>
      keyUpEventListener(e, $purchaseButton)
    );
  };

  const paintPurchaseAmountInput = ($root) => {
    const $board = purchaseEnterInput();
    $root.appendChild($board);

    addPurchaseEnterEventListener($root);

    $board.addEventListener('submit', eventHandler);
  };

  const purchaseEnterInput = () => {
    const $container = document.createElement('form');

    $container.innerHTML = gameTitle + purchaseAmountContainer;

    return $container;
  };

  this.init();
}
