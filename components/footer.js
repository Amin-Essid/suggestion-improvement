export default function Footer() {
  return (
    <>
      <div
        style={{
          display: "block",
          // padding: "1px",
          height: "60px",
          width: "100%",
        }}
      />
      <div
        style={{
          // padding: "1px",
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          height: "40px",
          background: "#400ccc",
          textAlign: "center",
          color: "white",
        }}
        //  className="footer"
      >
        <p style={{ paddingBottom: "10px" }}>
          Copyright © 2021 Jürgen Melter e.K.
        </p>
      </div>
    </>
  );
}
