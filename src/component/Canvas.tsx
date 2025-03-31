import { Lumiflex } from "uvcanvas"

export function Canvas() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
    }}>
      <Lumiflex />
    </div>
  );
}

