import Loader from ".";
export const FallbackLoading = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "white",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
        zIndex: 9999999,
        margin: 0,
        padding: 0,
        paddingTop: "21%",
      }}
    >
      <Loader loading={true} />
    </div>
  );
};
