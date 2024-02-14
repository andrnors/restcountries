const worldCurrencies = [
  {
    name: {
      common: "Cyprus",
      official: "Republic of Cyprus",
      nativeName: {
        ell: {
          official: "Δημοκρατία της Κύπρος",
          common: "Κύπρος",
        },
        tur: {
          official: "Kıbrıs Cumhuriyeti",
          common: "Kıbrıs",
        },
      },
    },
    currencies: {
      EUR: {
        name: "Euro",
        symbol: "€",
      },
    },
  },
  {
    name: {
      common: "Eritrea",
      official: "State of Eritrea",
      nativeName: {
        ara: {
          official: "دولة إرتريا",
          common: "إرتريا‎",
        },
        eng: {
          official: "State of Eritrea",
          common: "Eritrea",
        },
        tir: {
          official: "ሃገረ ኤርትራ",
          common: "ኤርትራ",
        },
      },
    },
    currencies: {
      ERN: {
        name: "Eritrean nakfa",
        symbol: "Nfk",
      },
    },
  },
  {
    name: {
      common: "Liberia",
      official: "Republic of Liberia",
      nativeName: {
        eng: {
          official: "Republic of Liberia",
          common: "Liberia",
        },
      },
    },
    currencies: {
      LRD: {
        name: "Liberian dollar",
        symbol: "$",
      },
    },
  },
];

module.exports = worldCurrencies;
