'use client';

import { ReactNode } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

type TabItem = {
  label: string;
  value: string;
};

type ReusableTabsProps = {
  value: string;
  onChange: (value: string) => void;
  tabs: TabItem[];
  children: ReactNode;
};

const tabListSx = {
  minHeight: 0,
  '& .MuiTabs-flexContainer': { gap: '4px' },
  '& .MuiTab-root': {
    minHeight: 0,
    padding: '12px 16px',
    fontFamily: '"Barlow Condensed", sans-serif',
    fontWeight: 600,
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-secondary)',
  },
  '& .MuiTab-root:hover': {
    color: 'var(--text)',
  },
  '& .Mui-selected': {
    color: 'var(--ember) !important',
  },
};

export default function ReusableTabs({
  value,
  onChange,
  tabs,
  children,
}: ReusableTabsProps) {
  const handleChange = (
    _event: React.SyntheticEvent,
    newValue: string
  ) => {
    onChange(newValue);
  };

  return (
    <TabContext value={value}>

      <Box sx={{ borderBottom: '1px solid var(--border)' }}>
        <TabList
          onChange={handleChange}
          aria-label="Tabs"
          sx={{
            ...tabListSx,

            '& .MuiTabs-indicator': {
              backgroundColor: 'var(--ember)',
              height: 2,
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
              disableRipple
            />
          ))}
        </TabList>
      </Box>

      {children}

    </TabContext>
  );
}