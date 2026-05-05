import * as Popover from '@radix-ui/react-popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'
import { cn } from '@/utils/cn'

interface DatePickerProps {
  label: string
  value?: string
  onChange: (date: string) => void
  error?: string
  disabled?: boolean
  className?: string
}

export function DatePicker({
  label,
  value,
  onChange,
  error,
  disabled,
  className
}: DatePickerProps) {
  const selectedDate = value ? new Date(value) : undefined

  return (
    <div className={cn('flex flex-col gap-2 group', className)}>
      <span
        className={cn(
          'text-sm transition-colors',
          error
            ? 'text-danger'
            : 'text-gray-700 group-focus-within:text-brand-base'
        )}
      >
        {label}
      </span>

      <Popover.Root>
        <Popover.Trigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              'p-2.5 flex items-center gap-2 rounded-lg border transition-colors text-left cursor-pointer outline-none',
              error
                ? 'border-danger'
                : 'border-gray-300 focus:border-brand-base focus:ring-1 focus:ring-brand-base',
              disabled && 'opacity-50 cursor-not-allowed bg-gray-50'
            )}
          >
            <CalendarIcon
              className={cn(
                'size-4 transition-colors',
                error
                  ? 'text-danger'
                  : 'text-gray-400 group-focus-within:text-brand-base'
              )}
            />
            <span
              className={cn(
                'flex-1 transition-colors',
                !value ? 'text-gray-400' : 'text-gray-800'
              )}
            >
              {selectedDate
                ? format(selectedDate, 'dd/MM/yyyy', { locale: ptBR })
                : 'Selecione uma data'}
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className="z-100 rounded-xl border border-gray-200 bg-white p-3 shadow-lg outline-none animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2"
            align="start"
            sideOffset={8}
            onOpenAutoFocus={(e) => e.preventDefault()} // Evita conflito de foco com a Modal
          >
            <DayPicker
              mode="single"
              locale={ptBR}
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  onChange(date.toISOString())
                }
              }}
              disabled={{ after: new Date() }}
              components={{
                Chevron: ({ ...props }) => {
                  if (props.orientation === 'left') {
                    return <ChevronLeft className="size-4" />
                  }
                  return <ChevronRight className="size-4" />
                }
              }}
              classNames={{
                month_caption:
                  'flex justify-center pt-1 relative items-center mb-4',
                caption_label: 'text-sm font-medium text-gray-900',
                nav: 'flex items-center',
                button_previous: cn(
                  'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center rounded-md border border-gray-200 absolute left-1 z-10'
                ),
                button_next: cn(
                  'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center rounded-md border border-gray-200 absolute right-1 z-10'
                ),
                month_grid: 'w-full border-collapse space-y-1',
                weekdays: 'flex',
                weekday:
                  'text-gray-500 rounded-md w-9 font-normal text-[0.8rem]',
                week: 'flex w-full mt-2',
                day: cn(
                  'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-gray-100 rounded-md transition-colors cursor-pointer flex items-center justify-center'
                ),
                selected:
                  'bg-brand-base text-white hover:bg-brand-base hover:text-white focus:bg-brand-base focus:text-white',
                today: 'bg-gray-100 text-gray-900',
                outside: 'text-gray-400 opacity-50',
                disabled: 'text-gray-400 opacity-50 cursor-not-allowed',
                hidden: 'invisible'
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {error && <span className="text-xs text-danger">{error}</span>}
    </div>
  )
}
