// mock data
const data = [
  {
    id: 1,
    name: "Popcorn",
    unitPrice: "N50",
    backgroundImage: "https://source.unsplash.com/ivYFPM44gYU",
  },
  {
    id: 2,
    name: "Coke",
    unitPrice: "N100",
    backgroundImage: "https://source.unsplash.com/SGHFWL_GVzk",
  },
  {
    id: 3,
    name: "Pepsi",
    unitPrice: "N100",
    backgroundImage: "https://source.unsplash.com/CqY5To2ZU8E",
  },
  {
    id: 4,
    name: "Chips",
    unitPrice: "N50",
    backgroundImage: "https://source.unsplash.com/8YBHgP0WrEo",
    },
  {
    id: 5,
    name: "Water",
    unitPrice: "N120",
    backgroundImage: "https://source.unsplash.com/N-MqWXXZvNY",
  },
  {
    id: 6,
    name: "Biscuits",
    unitPrice: "N30",
    backgroundImage: "https://source.unsplash.com/HuzdnhOfTKs",
    },
  {
    id: 7,
    name: "Pizza",
    unitPrice: "N50",
    backgroundImage: "https://source.unsplash.com/oBbTc1VoT-0",
  },
  {
    id: 8,
    name: "Rice",
    unitPrice: "N50",
    backgroundImage: "https://source.unsplash.com/O4CVzHODjjM",
  },
  {
    id: 9,
    name: "Ice Cream",
    unitPrice: "N50",
    backgroundImage: "https://source.unsplash.com/tVs-nga-tpo",
  },
];

// get container divs
const appPage = $('.appPage');
const tableSummary = $('.tableSummary');
const checkout = $('.checkout');
const payment = $('.payment');
const pay = $('.pay');
const farewell = $('.farewell');
const done = $('<button class="done">Done</button>');
const table = $('table');
const purchaseTotalPara = $('.purchaseTotal');
const input = $("input");

// initialize defaults
let purchaseTotal = 0
let paid = 0

const change = $("<p></p>");

// hide tableSummary and payment by default
tableSummary.hide();
payment.hide();
farewell.hide();

// handle table view
function handleTableView (item) {
  // check if table already has item
  // if () {}

  const quantity = 1;
  const itemPrice = `${item.unitPrice}`;
  const itemPriceNumber = Number(itemPrice.split('N').pop());
  const itemTotal = quantity * itemPriceNumber;
  purchaseTotal = purchaseTotal + itemTotal;

  tableSummary.show();
  const tbody =  $("<tbody></tbody>");
  const tableRow = $("<tr> class='item-row'></tr>")
  .append($("<td></td>").text(`${item.name}`))
  .append($("<td></td>").text(`${item.unitPrice}`))
  .append($("<td></td>").text(`${quantity}`))
  .append($("<td></td>").text(`${itemTotal}`));

  tbody.appendTo(table);
  tableRow.appendTo(tbody);
  purchaseTotalPara.text(`Total: N${purchaseTotal}`);
}

function showFarewellDetails () {
  appPage.hide();
  tableSummary.hide();
  payment.hide();
  farewell.show();

  // get the value from the input tag
  paid = input.val();

  change.text(`Your change is N${paid - purchaseTotal }`).appendTo(farewell);

  done.appendTo(farewell);

  // page reset
  done.click(() => {
    farewell.hide();
    appPage.show();
    checkout.show();
    // to- do reset all the values
    purchaseTotal = 0;
    paid= 0;
    table.empty();
    input.val("");
    change.text('');

    // replace cleared table header
    const tableHeader = $("<thead><tr><th>Item</th><th>Unit Price</th><th>Quantity</th><th>Total Value</th></tr></thead>")
    .appendTo(table);
  });
}

function handlePayment () {
  appPage.hide();
  checkout.hide();
  payment.show();
  
  pay.click(() => showFarewellDetails());
}

// handle display of shop items
data.forEach((item) => {
  // create item card
  const itemCard = $("<div class='card'></div>");
  const imgUrl = `url(${item.backgroundImage})`;

  const itemImage = $("<div class='card-image'></div>")
  .css({
    "background": `url(${item.backgroundImage}/640x250)`,
  })
  .appendTo(itemCard);

  const itemNamePara = $("<p class='card-name'></p>").text(`${item.name}`)
  .appendTo(itemCard);
  const itemPricePara = $("<p class='card-unit-price'></p>").text(`${item.unitPrice}`)
  .appendTo(itemCard);

  itemCard.click(() => handleTableView(item));

  appPage.append(itemCard);
});

checkout.click(() => handlePayment());
