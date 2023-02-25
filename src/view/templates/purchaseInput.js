export const gameTitle = `<p class="title lotto-title">🎱 내 번호 당첨 확인 🎱</p>`;

const inputMessage = `<p class="body">구입할 금액을 입력해주세요.</p>`;

const inputContent = `
  <input type="number" placeholder="금액" id="purchase-input" min="1000" max="100000" required />
  <button class="caption" type="button" id="purchase-button">구입</button>
`;

export const purchaseEnterContainer = `
  <div class="purchase-enter-container">
    ${inputContent}
  </div>
`;

export const purchaseAmountContainer = `
  <div class="purchase-amount-container">
    ${inputMessage}
    ${purchaseEnterContainer}
  </div>
`;
