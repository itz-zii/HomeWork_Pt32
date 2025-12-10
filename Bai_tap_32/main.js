const container = ReactDOM.createRoot(document.querySelector("#root"));

const Products = () => {
  const [value, setValue] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [data, setData] = React.useState([]);
  const [editList, setEditList] = React.useState([]);
  const [editValues, setEditValues] = React.useState({});
  const handleSave = (index) => {
    const newValue = editValues[index].trim();
    if (!newValue) {
      setMsg("Please fill in the task!");
      return;
    }

    if (data.includes(newValue) && data[index] !== newValue) {
      setMsg("Task already exists!");
      return;
    }

    const newData = [...data];
    newData[index] = newValue;
    setData(newData);

    setEditList(editList.filter((i) => i !== index));

    setMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClickBtn();
  };

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };
  const handleClickBtn = () => {
    if (!value) {
      setMsg("Please fill in the task!");
    } else if (data.includes(value)) {
      setMsg("Task already exists!");
    } else {
      setMsg("");
      setData([...data, value]);
      setValue("");
    }
  };

  const handleEdit = (index, value) => {
    if (!editList.includes(index)) {
      setEditList([...editList, index]);
    }

    setEditValues({
      ...editValues,
      [index]: value,
    });
  };

  const handleDelete = (index) => {
    setData(data.filter((item, _index) => _index !== index));
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1
        style={{
          fontWeight: "400",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Get Things Done !
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          marginBottom: "5px",
          justifyContent: "center",
        }}
      >
        <input
          style={{
            width: "350px",
            padding: "5px 15px 5px 15px",
            fontFamily: "Poppins, sans-serif",
            backgroundColor: "transparent",
            border: "2px #8758ff solid",
            color: "white",
            outline: "none",
            borderRadius: "5px 0 0 5px",
          }}
          placeholder="What is the task today?"
          onChange={handleChangeValue}
          value={value}
        />
        <button
          style={{
            backgroundColor: "#8758ff",
            width: "100px",
            color: "white",
            padding: "15px 5px 15px 5px",
            border: "none",
            borderRadius: "0px 5px 5px 0px",
            cursor: "pointer",
          }}
          type="button"
          onClick={handleClickBtn}
        >
          Add Task
        </button>
      </form>
      {msg && (
        <span
          style={{
            color: "red",
            border: "1px solid red",
            padding: "2px 5px",
            borderRadius: "5px",
            width: "fit-content",
            cursor: "default",
            userSelect: "none",
          }}
        >
          {msg}
        </span>
      )}

      {data.map((item, index) =>
        editList.includes(index) ? (
          <form
            key={index}
            onSubmit={(e) => {
              e.preventDefault();
              handleSave(index);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5px 0",
            }}
          >
            <input
              value={editValues[index]}
              onChange={(e) =>
                setEditValues({
                  ...editValues,
                  [index]: e.target.value,
                })
              }
              style={{
                width: "350px",
                padding: "5px 5px 5px 15px",
                fontFamily: "Poppins, sans-serif",
                backgroundColor: "#1a1a40",
                border: "2px #8758ff solid",
                color: "white",
                outline: "none",
                borderRadius: "5px 0 0 5px",
              }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: "#8758ff",
                width: "100px",
                color: "white",
                padding: "15px 5px",
                border: "none",
                borderRadius: "0 5px 5px 0",
                cursor: "pointer",
              }}
            >
              Add task
            </button>
          </form>
        ) : (
          <div
            key={index}
            style={{
              backgroundColor: "#8758ff",
              margin: "5px 0",
              borderRadius: "5px",
              padding: "10px 15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {item}

            <div style={{ display: "flex", marginLeft: "15px" }}>
              <i
                class="fa-solid fa-pen-to-square"
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(index, item)}
              ></i>

              <i
                onClick={() => handleDelete(index)}
                class="fa-solid fa-trash"
                style={{ marginLeft: "5px", cursor: "pointer" }}
              ></i>
            </div>
          </div>
        )
      )}
    </div>
  );
};
const wrapper = (
  <>
    <div
      style={{
        backgroundColor: "#1a1a40",
        display: "flex",
        padding: "40px",
        borderRadius: "25px",
        boxShadow: "15px 15px 15px 1px #0303043e",
        width: "auto",
        height: "auto",
      }}
    >
      <Products />
    </div>
  </>
);

container.render(wrapper);
