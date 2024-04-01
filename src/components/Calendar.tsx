import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Alert, Calendar } from 'antd';
import React, { useState } from 'react';

interface Leave {
        leave_id: number;
        leave_date: string;
        reason: string;
        user_id: number;
        user_role: string;
        status: string;
        course_code: string;
}

interface CalendarProps {
    leaves: Leave[];
}

const CalendarComponent: React.FC<CalendarProps> = ({leaves}) => {
    const [value, setValue] = useState(() => dayjs());
    const [selectedValue, setSelectedValue] = useState(() => dayjs('2017-01-25'));
  
    const onSelect = (newValue: Dayjs) => {
      setValue(newValue);
      setSelectedValue(newValue);
    };
  
    const onPanelChange = (newValue: Dayjs) => {
      setValue(newValue);
    };
  
    return (
      <>
        <Alert message={`You selected date: ${selectedValue?.format('YYYY-MM-DD')}`} />
        <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
      </>
    );
  };
  
  export default CalendarComponent;