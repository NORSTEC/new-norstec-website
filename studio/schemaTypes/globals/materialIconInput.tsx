import React from 'react'
import { set, unset } from 'sanity'
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

    return (
        <div style={{ display: 'grid', gap: 8 }}>
            {ICONS.map((icon) => {
                const isSelected = value === icon.value
                return (
                    <button
                        className={`material-icon-button ${isSelected ? "selected" : ""}`}
                        onClick={() => onChange(isSelected ? unset() : set(icon.value))}
                    >
                        <span className="material-icons material-icon-preview">
                            {icon.value}
                        </span>
                        <span>{icon.label}</span>
                    </button>
                )
            })}
        </div>
    )
}