import { useState, useRef } from "react";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";


function GSTcalculator() {
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [gst, setGst] = useState("");

    const rDate = useRef(new Date().toLocaleString());

    const hDownload = () => {
        if (!name) {
            toast.error("Please enter the product name", { position: "top-center" });
            return;
        }
        if (!cost) {
            toast.error("Please enter the cost", { position: "top-center" });
            return;
        }
        if (!gst) {
            toast.error("Please enter the GST percentage", { position: "top-center" });
            return;
        }

        const parsedCost = parseFloat(cost);
        const parsedGst = parseFloat(gst);
        const gstAmount = (parsedCost * parsedGst) / 100;
        const finalAmt = parsedCost + gstAmount;

        const billContent = `Date: ${rDate.current}\nProduct Name: ${name}\nCost: ₹${parsedCost.toFixed(2)}\nGST: ${parsedGst}%\nFinal Amount: ₹${finalAmt.toFixed(2)}`;

        const blob = new Blob([billContent], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `${name}_GST_Bill.txt`);
        toast.success("Bill downloaded successfully!", { position: "top-center" });
    };

    return (
        <>
            <div className="App">
                <ToastContainer />
                <h1>GST Bill Generator</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Product Name:
                        <br />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter product name"
                        />
                    </label>
                    <br />
                    <label>
                        Cost:
                        <br />
                        <input
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            placeholder="Enter cost"
                        />
                    </label>
                    <br />
                    <label>
                        GST (%):
                        <br />
                        <input
                            type="number"
                            value={gst}
                            onChange={(e) => setGst(e.target.value)}
                            placeholder="Enter GST Percentage"
                        />
                    </label>
                    <br />
                    <button type="button" onClick={hDownload}>
                        <FiDownload /> Download Bill
                    </button>
                </form>
            </div>
        </>
    );
}

export default GSTcalculator;