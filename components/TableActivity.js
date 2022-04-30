import {
    ActionIcon, Group, TextInput, useMantineColorScheme, Checkbox 
} from "@mantine/core";
import React, { useCallback, useMemo, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { RotateClockwise, Search } from "tabler-icons-react";


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

export function TableActivity({ data, columns, toggleCleared, setSelectedRows, setToggleCleared }) {
  const { colorScheme } = useMantineColorScheme();
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
 


  const filteredItems = data.filter(
    item => item.status && item.status.toLowerCase().includes(filterText.toLowerCase()),
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


  createTheme("theme", {
    text: {
      primary: colorScheme,
      secondary: colorScheme,
    },
    background: {
      default: colorScheme,
    },
    sortFocus: {
      default: colorScheme === "light" ? "#00000" : "#ffffff",
    },
    divider: {
      default: colorScheme === "light" ? "#e9ecef" : "#373A40",
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
