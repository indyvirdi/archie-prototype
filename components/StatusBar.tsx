/* iOS status bar — exact SVGs (time, signal, wifi, battery). */
/* eslint-disable @next/next/no-img-element */
export default function StatusBar() {
  return (
    <div className="statusbar">
      <img className="statusbar__time" src="/assets/status-time.svg" alt="9:41" width={29} height={12} />
      <div className="statusbar__icons">
        <img src="/assets/status-signal.svg" alt="" width={17} height={11} />
        <img src="/assets/status-wifi.svg" alt="" width={16} height={11} />
        <img src="/assets/status-battery.svg" alt="" width={25} height={12} />
      </div>
    </div>
  );
}
