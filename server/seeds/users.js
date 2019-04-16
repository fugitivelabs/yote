
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // inserts seed entries
      // passwords based on default secrets seeds
      return knex('users').insert([
        {
          _id: 1
          , username: 'admin@admin.com' // pw: admin
          , password_salt: "bwtSb6CAxyv7UDcOY9tiIr6UDd9ag85mO3CrMhGtHow+xfV3hUPzFfRB/dlptTl1eBqNQ3TrAOSBR6sdih7p3ZzbP8vgNoyJ/ZiA+gVjTt+9AIf+SW5v/KRzZvVdkmx9O61jUfKSDsfuWW957lSf8y6plGcegSeINdINrr5meTNbvFnAKIA2JFp4Gps9Iy9iTyW+KYynBCvm+y1V30edaWiW5G/CZMePvehCJ+PnNKtEdwcuzXzbf/aTjFOtLwO1QBIARc5qLSNIvB4t7sTWcrSebhlDTxQ52teTC0F+QPjCSPMJ9UHiSk/eOdleEJJqczq94CyryC8ddnGTkQLiIg=="
          , password_hash: "53ee542ec49ea8717f6fba8c4240bf11715ac1a2"
        },
        {
          _id: 2
          , username: 'test@fugitivelabs.com' // pw: fugitive
          , password_salt: "4+IacHaytF7lExMCkTlpC8npVh65+OdRkkg+sytWRxgV6DsVI0G2kPvWaavAqpbWmuDoJoqZLnnCgowCuzEOAo5QZBQynDuRM+jKDHOco+w7XTESrQ6gDU80qX8uGjx+9RHLkiya6v0ETmbE+5+RNWc4Wg5jKuBpWDV5+U2ak9OxKYqTusD76q3uJPtUh0i3ioaj7xFiPZjzLx3iDr6ybVqbTLs0vim4jYIrX8gP+8LQlHAnXwd3NqukTkZBpAEhUHeUGNiaPCGf/ur8DjVABXFHpLCdFJ1GfB9lQg9GMNstTFfJrb4pm7YETw3joUjkEehnQImT8s3ipnskPXpXjg=="
          , password_hash: "358c7091a72e7e36cf8b7d61f76dadcebce8ff20"
        },
      ]);
    });
};
