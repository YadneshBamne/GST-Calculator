import { useState, useRef } from "react";
import { saveAs } from "file-saver";
import { ToastContainer, toast } from "react-toastify";
import { FiDownload } from "react-icons/fi";


function GSTcalculator() {
    const [name, setName] = useState("");
    const [cost, setCost] = useState("");
    const [gst, setGst] = useState("");

    const rName = useRef();
    const rCost = useRef();
    const rGst = useRef();
    const rDate = useRef(new Date().toLocaleString());

    const hName = (e) => setName(e.target.value);
    const hCost = (e) => setCost(e.target.value);
    const hGst = (e) => setGst(e.target.value);

    const hDownload = (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Please enter the product name", { position: "top-center" });
            rName.current.focus();
            return;
        }
        if (!cost) {
            toast.error("Please enter the cost", { position: "top-center" });
            rCost.current.focus();
            return;
        }
        if (!gst) {
            toast.error("Please enter the GST percentage", { position: "top-center" });
            rGst.current.focus();
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


        setName("");
        setCost("");
        setGst("");
    };

    return (
        <div className="App">
            <ToastContainer />
            <h1>Avanish GST Calculator Crayz setup</h1>
            <form>
                <label>
                    Product Name:
                    <br />
                    <input
                        type="text"
                        ref={rName}
                        value={name}
                        onChange={hName}
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
                        onChange={hCost}
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
                        onChange={hGst}
                        placeholder="Enter GST Percentage"
                    />
                </label>
                <br />
                <button type="button" onClick={hDownload}>
                    <FiDownload /> Download Bill
                </button>
            </form>
        </div>
    );
}

export default GSTcalculator;
