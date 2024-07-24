
import React, { useEffect, useState } from "react";
import "./App.css";

const empty_values = {
  bill: 0,
  people: 1,
  tip: 0,
};

const empty_totals = {
  totalTip: 0,
  total: 0,
};

export default function App() {
  const [values, setValues] = useState(empty_values);
  const [totals, setTotals] = useState(empty_totals);
  const [warning, setWarning] = useState(""); // Estado para manejar la advertencia

  const resetAll = () => {
    setValues(empty_values);
    setTotals(empty_totals);
    setWarning(""); // Restablecer advertencia
  };

  const computeTotals = () => {
    const { tip, bill, people } = values;

    if (tip !== 0 && bill !== 0 && people > 0) {
      const totalTip = (bill * (tip / 100)) / people;
      const total = bill / people + totalTip;
      setTotals({ totalTip: totalTip.toFixed(2), total: total.toFixed(2) });
    } else {
      setTotals(empty_totals);
    }
  };

  useEffect(() => {
    computeTotals();
  }, [values]);

  const handleValues = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: parseFloat(value) });

    // Mostrar advertencia si el número de personas es 0 o negativo
    if (name === "people" && parseFloat(value) <= 0) {
      setWarning("Can't be zero");
    } else {
      setWarning("");
    }
  };

  return (
    <>
      <header>
        <img src="./images/logo.svg" alt="Logo" />
      </header>
      <div className="general-wrapper">
        <div className="data-wrapper">
          <h1>Bill</h1>
          <label htmlFor="input-bill">
            <input
              className="input-bill"
              id="input-bill"
              name="bill"
              type="number"
              value={values.bill}
              min="0"
              onChange={handleValues}
            />
          </label>
          <h2>Select Tip %</h2>
          <ul>
            {[5, 10, 15, 25, 50].map((tp) => (
              <li id={`percentage-${tp}`} key={tp}>
                <button
                  type="button"
                  onClick={handleValues}
                  name="tip"
                  className={`percentage-button ${values.tip === tp ? "active" : ""}`}
                  value={tp}
                >
                  {tp}%
                </button>
              </li>
            ))}
            <li>
              <input
                type="number"
                placeholder="Custom"
                id="custom-percentage-button"
                className="percentage-button"
                name="tip"
                onChange={handleValues}
              />
            </li>
          </ul>
          <h2>Number of People</h2>
          {warning && <p className="warning-text">{warning}</p>} {/* Mostrar advertencia */}
          <label htmlFor="input-people">
            <input
              id="input-people"
              className={`input-people ${warning ? "input-error" : ""}`} // Aplicar estilo de error
              type="number"
              name="people"
              value={values.people}
              min="1"
              onChange={handleValues}
            />
          </label>
        </div>
        <div className="result-wrapper">
          <div className="result-txt">
            <div className="text-amount">
              <div>
                <h2>Tip Amount</h2>
                <p>/ person</p>
              </div>
              <h3>
                $<span id="tip-amount">{totals.totalTip}</span>
              </h3>
            </div>
            <div className="total-amount">
              <div>
                <h2>Total</h2>
                <p>/ person</p>
              </div>
              <h3>
                $<span id="total">{totals.total}</span>
              </h3>
            </div>
          </div>
          <button
            type="button"
            id="reset-button"
            className="reset-button"
            onClick={resetAll}
          >
            RESET
          </button>
        </div>
      </div>
    </>
  );
}


// Prueba uno: con error
// import React, { useEffect, useState } from "react";
// import "./App.css";

// const empty_values = {
//   bill: 0,
//   people: 1,
//   tip: 0,
// };

// const empty_totals = {
//   totalTip: 0,
//   total: 0,
// };

// export default function App() {
//   const [values, setValues] = useState(empty_values);
//   const [totals, setTotals] = useState(empty_totals);

//   const resetAll = () => {
//     setValues(empty_values);
//     setTotals(empty_totals);
//   };

//   const computeTotals = () => {
//     const { tip, bill, people } = values;

//     if (tip !== 0 && bill !== 0 && people > 0) {
//       const totalTip = (bill * (tip / 100)) / people;
//       const total = bill / people + totalTip;
//       setTotals({ totalTip: totalTip.toFixed(2), total: total.toFixed(2) });
//     } else {
//       setTotals(empty_totals);
//     }
//   };

//   useEffect(() => {
//     computeTotals();
//   }, [values]);

//   const handleValues = (e) => {
//     const { name, value } = e.target;
//     setValues({ ...values, [name]: parseFloat(value) });
//   };

//   return (
//     <>
//       <header>
//         <img src="./images/logo.svg" alt="Logo" />
//       </header>
//       <div className="general-wrapper">
//         <div className="data-wrapper">
//           <h1>Bill</h1>
//           <label htmlFor="input-bill">
//             <input
//               className="input-bill"
//               id="input-bill"
//               name="bill"
//               type="number"
//               value={values.bill}
//               min="0"
//               onChange={handleValues}
//             />
//           </label>
//           <h2>Select Tip %</h2>
//           <ul>
//             {[5, 10, 15, 25, 50].map((tp) => (
//               <li id={`percentage-${tp}`} key={tp}>
//                 <button
//                   type="button"
//                   onClick={handleValues}
//                   name="tip"
//                   className={`percentage-button ${values.tip === tp ? "active" : ""}`}
//                   value={tp}
//                 >
//                   {tp}%
//                 </button>
//               </li>
//             ))}
//             <li>
//               <input
//                 type="number"
//                 placeholder="Custom"
//                 id="custom-percentage-button"
//                 className="percentage-button"
//                 name="tip"
//                 onChange={handleValues}
//               />
//             </li>
//           </ul>
//           <h2>Number of People</h2>
//           <label htmlFor="input-people">
//             <input
//               id="input-people"
//               className="input-people"
//               type="number"
//               name="people"
//               value={values.people}
//               min="1"
//               onChange={handleValues}
//             />
//           </label>
//         </div>
//         <div className="result-wrapper">
//           <div className="result-txt">
//             <div className="text-amount">
//               <div>
//                 <h2>Tip Amount</h2>
//                 <p>/ person</p>
//               </div>
//               <h3>
//                 $<span id="tip-amount">{totals.totalTip}</span>
//               </h3>
//             </div>
//             <div className="total-amount">
//               <div>
//                 <h2>Total</h2>
//                 <p>/ person</p>
//               </div>
//               <h3>
//                 $<span id="total">{totals.total}</span>
//               </h3>
//             </div>
//           </div>
//           <button
//             type="button"
//             id="reset-button"
//             className="reset-button"
//             onClick={resetAll}
//           >
//             RESET
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


// /********************* */
// // mio

// // import React, { useEffect, useState } from "react";
// // import "./App.css";

// // const empty_values = {
// //   bill: 0,
// //   people: 1,
// //   tip: 0,
// // };

// // const empty_totals = {
// //   totalTip: 0,
// //   total: 0,
// // };

// // export default function App() {
// //   // const [bill, setBill] = useState(0)
// //   // const [people, setPeople] = useState(1)
// //   // const [tip, setTip] = useState(0)
// //   const [values, setValues] = useState(empty_values);
// //   const [totals, setTotals] = useState(empty_totals);
// //   // const [totalTip, setTotalTip] = useState(0)
// //   // const [total, setTotal] = useState(0)

// //   // const tipValues = [5, 10, 15, 25, 50]

// //   // const handleTip = (e) => {
// //   //   setTip(parseInt(e.target.value))
// //   // }

// //   const resetAll = () => {
// //     setValues(empty_values);
// //     setTotals(empty_totals);
// //   };

// //   const computeTotals = () => {
// //     const { tip, bill, people } = values;

// //     if (tip != 0 && bill != 0 && people > 0) {
// //       const totalTip = (bill * (tip / 100)) / people;

// //       const total = bill / people + totalTip;

// //       setTotals({ totalTip, total });
// //     }
// //   };

// //   //useEffect = hook // esto supervisa los estados como un 'if' / si hay un cambio en 'tip', 'people', 'bill' ejecuta 'computeTotals'
// //   useEffect(() => {
// //     computeTotals();
// //   }, [values]);

// //   const handleValues = (e) => {
// //     /**ESTO ocurre en 'setValues' */
// //     // const target = e.target
// //     // const obk = {...values}
// //     // const name = target.name
// //     // obj[name] = parseFloat(target.value)
// //     // setValues(obj)
// //     setValues({ ...values, [target.name]: parseFloat(target.value) }); // ... = esto hace una copia de un array/objeto solo si el receptor es del mismo tipo
// //   };

// //   return (
// //     <>
// //       <header>
// //         <img src="./images/logo.svg" alt="" />
// //       </header>
// //       <div className="general-wrapper">
// //         <div className="data-wrapper">
// //           <h1>Bill</h1>
// //           <label htmlFor="input-bill">
// //             <input
// //               className="input-bill"
// //               id="input-bill"
// //               name="bill"
// //               type="number"
// //               value={values.bill}
// //               min="0"
// //               onChange={handleValues}
// //             />
// //           </label>
// //           <h2>Select Tip %</h2>
// //           <ul>
// //             {[5, 10, 15, 25, 50].map((tp) => (
// //               <li id="percentage-5" key={tp}>
// //                 <button
// //                   type="button"
// //                   onClick={handleValues}
// //                   name="tip"
// //                   className={`percentage-button ${
// //                     values.tip === tp && "active"
// //                   }`}
// //                   value={tp}
// //                 >
// //                   {tp}%
// //                 </button>
// //               </li>
// //             ))}
// //             <li>
// //               <input
// //                 type="number"
// //                 placeholder="Custom"
// //                 id="custom-percentage-button"
// //                 className="percentage-button"
// //                 onChange={handleValues}
// //               />
// //             </li>
// //           </ul>
// //           <h2>Number of People</h2>
// //           <label htmlFor="input-people">
// //             <input
// //               id="input-people"
// //               className="input-people"
// //               type="number"
// //               name="people"
// //               value={values.people}
// //               min="1"
// //               onChange={handleValues}
// //             />
// //           </label>
// //         </div>
// //         <div className="result-wrapper">
// //           <div className="result-txt">
// //             <div className="text-amount">
// //               <div>
// //                 <h2>Tip Amount</h2>
// //                 <p>/ person</p>
// //               </div>
// //               <h3>
// //                 $<span id="tip-amount">{totals.totalTip}</span>
// //               </h3>
// //             </div>
// //             <div className="total-amount">
// //               <div>
// //                 <h2>Total</h2>
// //                 <p>/ person</p>
// //               </div>
// //               <h3>
// //                 $<span id="total">{totals.total}</span>
// //               </h3>
// //             </div>
// //           </div>
// //           <button
// //             type="button"
// //             id="reset-button"
// //             className="reset-button"
// //             onClick={resetAll}
// //           >
// //             RESET
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }
