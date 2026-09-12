'use client';

import { ReactNode } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import type { LucideIcon } from 'lucide-react';

interface TabItem {
    label: string;
    value: string;
    icon?: LucideIcon;
}

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
    fontFamily: '"Segoe UI", sans-serif',
    fontWeight: 600,
    fontSize: '13px',
    textTransform: 'uppercase',
    // letterSpacing: '0.5px',
    color: 'var(--text-secondary)',
  },
  '& .MuiTab-root:hover': {
    color: 'var(--text)',
  },
  '& .Mui-selected': {
    color: 'var(--ember) !important',
  },
};

export default function ForgeFlowTabs({
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
              icon={tab.icon ? <tab.icon size={15} /> : undefined}
              iconPosition="start"
              disableRipple
            />
          ))}
        </TabList>
      </Box>

      {children}

    </TabContext>
  );
}