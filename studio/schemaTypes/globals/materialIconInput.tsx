import React, { useState } from 'react'
import { set, unset } from 'sanity'
import { Button, Dialog, Box, Grid, Stack, Text } from '@sanity/ui'
import type { StringInputProps } from 'sanity'

const ICONS = [
    { label: 'People / organizations', value: 'group' },
    { label: 'Growth / progress', value: 'trending_up' },
    { label: 'Collaboration', value: 'handshake' },
    { label: 'Funding', value: 'attach_money' },
    { label: 'Rocket / launch', value: 'rocket_launch' },
]

export function MaterialIconInput(props: StringInputProps) {
    const { value, onChange } = props
    const [open, setOpen] = useState(false)

    const handleSelect = (val: string) => {
        onChange(set(val))
        setOpen(false)
    }

    const handleClear = () => {
        onChange(unset())
    }

    return (
        <Stack space={3}>
            {/* Selected icon preview */}
            {value && (
                <Box padding={3} style={{ border: '1px solid #3D4258', borderRadius: 6 }}>
                    <Stack space={2}>
                        <Text size={1} muted>
                            Selected icon:
                        </Text>
                        <span className="material-icons" style={{ fontSize: 36 }}>
                          {value}
                        </span>
                        <Button
                            tone="critical"
                            text="Remove icon"
                            onClick={handleClear}
                            mode="ghost"
                            fontSize={1}
                            style={{
                                cursor: 'pointer',
                            }}
                        />
                    </Stack>
                </Box>
            )}

            {/* Open modal button */}
            <Button
                tone="default"
                text={value ? 'Change icon' : 'Choose icon'}
                style={{
                    cursor: 'pointer',
                }}
                onClick={() => setOpen(true)}
            />

            {/* Modal dialog */}
            {open && (
                <Dialog
                    header="Choose an icon"
                    width={1}
                    onClose={() => setOpen(false)} id={''}>
                    <Box padding={4} style={{ maxHeight: 400, overflowY: 'auto' }}>
                        <Grid columns={5} gap={4}>
                            {ICONS.map((icon) => (
                                <Button
                                    key={icon.value}
                                    mode="ghost"
                                    onClick={() => handleSelect(icon.value)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        border:
                                            value === icon.value ? '1px solid #576BED' : '1px solid #3D4258',
                                    }}
                                >
                                  <span className="material-icons" style={{ fontSize: 36, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    {icon.value}
                                  </span>
                                </Button>
                            ))}
                        </Grid>
                    </Box>
                </Dialog>
            )}
        </Stack>
    )
}