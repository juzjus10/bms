import React, { useState, useMemo } from "react";
import {
  TextInput,
  Text,
  Button,
  useMantineColorScheme,
  Group,
  Modal,
  ActionIcon,
  Checkbox
} from "@mantine/core";
import { Search, RotateClockwise, Check } from "tabler-icons-react";
import DataTable, { createTheme } from "react-data-table-component";
import { useCallback } from "react";


const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextInput
      placeholder="Search by any field"
      icon={<Search size={14} />}
      value={filterText}
      onChange={onFilter}
      rightSection={<ActionIcon onClick={onClear}> <RotateClockwise size={14} /> </ActionIcon>}
    />
  </>
);

export function TableInquiries({ data, columns, toggleCleared, setSelectedRows, setToggleCleared }) {
  const { colorScheme } = useMantineColorScheme();
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
 


  const filteredItems = data.filter(
    item => item.dateInquired && item.dateInquired.toLowerCase().includes(filterText.toLowerCase()),
  );
  const handleRowSelected = useCallback(state => {
    setSelectedRows(state.selectedRows);
  }, []);

  
  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };
    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  console.log(colorScheme);
  createTheme("theme", {
    text: {
      primary: colorScheme,
      secondary: colorScheme,
    },
    background: {
      default: colorScheme,
    },
    sortFocus: {
      default: colorScheme === "dark" ? "#00000" : "#ffffff",
    },
    divider: {
      default: colorScheme === "dark" ? "#e9ecef" : "#373a40"
    },
  });


  return (
    <>
      <Group position="right" mb={10}>

        
       
      

       
      </Group>

      <DataTable
        columns={columns}
        data={filteredItems}
        theme="theme"
        pagination
        selectableRows
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        selectableRowsComponent={Checkbox}
      />
    </>
  );
}
