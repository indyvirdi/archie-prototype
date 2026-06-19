/* The phone's real status bar is shown by the device, so we render no
   fake one — just a safe-area spacer (0 in a browser tab, protective in
   standalone/home-screen mode on notched phones). */
export default function StatusBar() {
  return <div className="statusbar-spacer" />;
}
