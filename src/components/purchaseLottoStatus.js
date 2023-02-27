import {
  pusrchaseCountMessage,
  ticketContainer,
} from '../view/templates/lottoGame';

export default function LottoStatus($root, lottos) {
  this.state = {
    $root,
    lottos,
  };

  this.init = () => {
    paintLottoStatus(this.state.$root, this.state.lottos);
  };
  this.render = () => {};

  const purchaseLottoStatus = (lottos) => {
    const $board = document.createElement('div');
    const purchastCount = pusrchaseCountMessage(lottos.length);
    $board.innerHTML = purchastCount + ticketContainer(lottos);

    return $board;
  };

  const paintLottoStatus = ($root, lottos) => {
    const $board = purchaseLottoStatus(lottos);
    $root.appendChild($board);
  };
}
