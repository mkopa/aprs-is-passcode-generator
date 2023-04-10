const zeroPad = (num, places) => String(num).padStart(places, "0");

const aprsPass = (callsign) => {
    if (!callsign || callsign.length < 3) {
        return "";
    }
    if (callsign.length > 20) {
        return "Callsign is too long!";
    }
    const encoding = new TextEncoder();
    // initial hash
    const hash = 0x73e2;

    const pass = zeroPad(
        Array.from(
            encoding.encode(
                callsign.trim().replace(" ", "").toUpperCase().split("-").shift()
            )
        ).reduce(
            (acu, currentChar, index) =>
                index % 2 === 0 ? acu ^ (currentChar << 8) : acu ^ currentChar,
            hash
        ) & 0x7fff,
        5
    );

    return pass;
};

window.onload = (event) => {
    const source = document.getElementById("callsign");
    source.value = "";

    const onCallsignTextInputChange = (event) =>
        (passcode.innerHTML = `Passcode: ${aprsPass(event.target.value)}`);
    source.addEventListener("input", onCallsignTextInputChange);
};