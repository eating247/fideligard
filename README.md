# fideligard

An AngularJS single-page web application using UI-Router multi-view states, NoSQL data modeling, and modular code to create a historical stock portfolio simulator with trading data via the Quandl API.

To fire on local server, `git clone` the repository and run `ruby -run -e httpd . -p 3000`.

## Features

- Users are prompted to begin trading after stock data loads.
- Stock panel automatically updates to reflect prices and price changes for the date selected in the slider.

![Welcome](https://github.com/eating247/fideligard/blob/master/screenshots/welcome.png)

- If the user wishes to enter a trade for any stock at the selected date, links provided in the stock panel will provide a trade form autopopulated with respective date and price information for the relevant stock.

![Valid Trade](https://github.com/eating247/fideligard/blob/master/screenshots/trade-valid.png)

- Submission automatically disabled if user attempts to buy more stocks than their available cash, or sell more quantity of any stock than they own.

![Invalid Trade](https://github.com/eating247/fideligard/blob/master/screenshots/trade-invalid.png)

- All transactions up to selected date can be sorted according to date, price, ticker, or type (Buy/Sell).

![Transactions](https://github.com/eating247/fideligard/blob/master/screenshots/transactions.png)

- User's portfolio updates according to selected date, as adjusted through the date slider.
- Portfolio view automatically calculates cost basis, current value, and profit/loss for positions held at any point of time in the given interval.

![Portfolio](https://github.com/eating247/fideligard/blob/master/screenshots/portfolio.png)
