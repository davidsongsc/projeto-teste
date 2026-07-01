'use client';

import { useState, useCallback } from 'react';
import { AutoComplete, Spin } from 'antd';
import { useCustomers } from '@/src/hooks/useCustomers';
import debounce from 'lodash/debounce'; 

export const CustomerAutoComplete = ({ onSelect }: { onSelect: (id: string) => void }) => {
    const { autocompleteCustomers } = useCustomers();
    const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState(''); 

    const debouncedSearch = useCallback(
        debounce(async (search: string) => {
            if (typeof search !== 'string' || !search.trim()) {
                setOptions([]);
                return;
            }
            
            setLoading(true);
            try {
                const results = await autocompleteCustomers(search);
                setOptions(results || []);
            } catch (error) {
                setOptions([]);
            } finally {
                setLoading(false);
            }
        }, 500),
        [autocompleteCustomers]
    );

    return (
        <AutoComplete
            value={inputValue} 
            options={options}
            onChange={(val) => setInputValue(val)} 
            onSearch={(val) => debouncedSearch(val)}
            onSelect={(value, option) => {
                onSelect(value); 
                setInputValue(option.label); 
            }} 
            placeholder="Buscar cliente pelo nome..."
            style={{ width: '100%' }}
            notFoundContent={loading ? <Spin size="small" /> : null}
        />
    );
};