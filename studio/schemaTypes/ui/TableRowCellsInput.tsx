import React, {useEffect} from 'react'
import {useFormValue, set} from 'sanity'
import {Stack, Text, TextInput, Card} from '@sanity/ui'

type Props = any

export function TableRowCellsInput(props: Props) {
    const {value, onChange} = props

    const columns = (useFormValue(['columns']) as any[]) || []
    const columnCount = columns.length

    useEffect(() => {
        if (!columnCount) return

        const current = Array.isArray(value) ? (value as string[]) : []
        if (current.length !== columnCount) {
            const next = Array.from(
                {length: columnCount},
                (_, i) => current[i] || '',
            )
            onChange(set(next))
        }
    }, [columnCount, value, onChange])

    if (!columnCount) {
        return (
            <Card padding={3} tone="caution" radius={2}>
                <Text size={1}>Define columns before adding rows.</Text>
            </Card>
        )
    }

    const cells: string[] = Array.isArray(value) ? (value as string[]) : []

    const handleChange = (index: number, nextVal: string) => {
        const next = [...cells]
        next[index] = nextVal
        onChange(set(next))
    }

    return (
        <Stack space={3}>
            {columns.map((col, index) => (
                <Stack key={index} space={2}>
                    <Text size={1} weight="medium">
                        {col.label || col.title || `Column ${index + 1}`}
                    </Text>
                    <TextInput
                        value={cells[index] || ''}
                        onChange={(e) => handleChange(index, e.currentTarget.value)}
                    />
                </Stack>
            ))}
        </Stack>
    )
}