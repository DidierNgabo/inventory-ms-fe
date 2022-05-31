import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import React from "react";

const SearchInput = ({ data }) => {
  const [options, setOptions] = React.useState([]);

  const searchResult = (query) => {
    const filteredData = data.filter(({ name }) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    return filteredData.map(({ name }) => ({ value: name, label: name }));
  };

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  return (
    <div>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        options={options}
        style={{ width: 300 }}
        onSelect={onSelect}
        onSearch={handleSearch}
      >
        <Input
          size="large"
          placeholder="search here"
          suffix={<SearchOutlined />}
        />
      </AutoComplete>
    </div>
  );
};

export default SearchInput;
