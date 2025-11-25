'use client'

import { useState } from "react"

interface Device {
  id: string
  name: string
  official: boolean
  user: string
  appVersion?: string
  iosVersion?: string
  appDays?: string
  conDays?: string
  qmDays?: string
  appStatus?: 'approved' | 'pending'
  conStatus?: 'approved' | 'pending'
  qmStatus?: 'approved' | 'pending'
}

// Colors
const RED_DARK = '#ac1717';
const RED_TINT = '#ac171720';
const SUCCESS_GREEN = '#12845b';
const SUCCESS_TINT = '#12845b20';
const ACTION_BLUE = '#126fd6';
const ACTION_BLUE_TINT = '#126fd620';
const ACTION_BLUE_HOVER = '#0c58b0';

export default function DeviceStatusTable() {

  // FIX: every device now has `official: false` if not true
  const initialDevices: Device[] = [
    {
      id: '1',
      name: "Felix Patte's iPhone",
      official: true,
      user: '(shared device)',
      appVersion: '4.8.17',
      iosVersion: '16.7',
      appDays: '75 days',
      conDays: '475 days',
      qmDays: '5 days',
    },
    {
      id: '2',
      name: "Andro Dadic's Device",
      official: false,
      user: 'Dadic, Andro',
      appVersion: '1.3',
      iosVersion: 'Android 14',
      appDays: '75 days',
      qmDays: '5 days',
    },
    {
      id: '3',
      name: "Bruno Hainz's Device",
      official: false,
      user: 'Hainz, Bruno (no login)',
      appVersion: '1.2',
      iosVersion: 'Android 13',
      appDays: '75 days',
      conDays: '475 days',
    },
    {
      id: '4',
      name: "Dario Vukusic's iPhone",
      official: false,
      user: 'Vukusic, Dario',
      appVersion: '4.9.20',
      iosVersion: '17.6.1',
      appDays: '75 days',
    },
    {
      id: '5',
      name: "Florent Dufour's iPhone",
      official: false,
      user: 'Dufour, Florent',
      appVersion: '4.8.17',
      iosVersion: '17.1',
      appDays: '75 days',
    },
    {
      id: '6',
      name: "Laura Dadic's iPhone",
      official: false,
      user: 'Dadic, Laura',
      appVersion: '4.9.20',
      iosVersion: '17.6.1',
      appDays: '75 days',
      conDays: '475 days',
    },
    {
      id: '7',
      name: "Massimo Chiglien's Device",
      official: false,
      user: 'Chiglien, Massimo',
      appVersion: '1.3',
      iosVersion: 'Android 10',
      appDays: '75 days',
      conDays: '475 days',
      qmDays: '5 days',
    },
    {
      id: '8',
      name: "Massimo Chiglien's Device 1",
      official: false,   // FIXED
      user: 'Chiglien, Massimo',
      appVersion: '1.3',
      iosVersion: 'Android 14',
      appStatus: 'approved',
      conStatus: 'approved',
    },
    {
      id: '9',
      name: "Md Amir Shohail's Device",
      official: false,  // FIXED
      user: 'Shohail, Md Amir',
      appVersion: '5.0.3',
      iosVersion: 'Android 15',
      appStatus: 'approved',
    },
    {
      id: '10',
      name: "Modesta Karciauskiene's Device",
      official: false,
      user: 'Karciauskiene, Modesta',
      appVersion: '1.3',
      iosVersion: 'Android 14',
      appDays: '75 days',
      conDays: '475 days',
      qmDays: '5 days',
    },
    {
      id: '11',
      name: "Nouha Diedhiou's iPad",
      official: false,
      user: 'Diedhiou, Nouha',
      appVersion: '4.8.16',
      iosVersion: '16.5.1',
      appDays: '75 days',
      conDays: '475 days',
      qmDays: '5 days',
    },
    {
      id: '12',
      name: "Regis Perche's iPhone",
      official: false,
      user: 'Perche, Regis',
      appVersion: '4.9.12',
      iosVersion: '17.5.1',
      appDays: '75 days',
      conDays: '475 days',
    },
    {
      id: '13',
      name: "Tihomir Okiciki's iPhone",
      official: false,
      user: 'Okiciki, Tihomir',
      appVersion: '4.9.12',
      iosVersion: '17.6.1',
      appDays: '75 days',
      conDays: '475 days',
      qmDays: '5 days',
    },
    {
      id: '14',
      name: "William Vergnaud's iPhone",
      official: false,
      user: 'Vergnaud, William',
      appVersion: '4.9.12',
      iosVersion: '17.5.1',
      appDays: '75 days',
      conDays: '475 days',
    },
  ];

  const [devices, setDevices] = useState<Device[]>(initialDevices);
  const [isEditing, setIsEditing] = useState(false);
  const [originalDevices, setOriginalDevices] = useState<Device[]>(initialDevices);

  // Buttons
  const handleEdit = () => {
    setOriginalDevices([...devices]);
    setIsEditing(true);
  };

  const handleSave = () => {
    setOriginalDevices([...devices]);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDevices(originalDevices);
    setIsEditing(false);
  };

  // FIXED Checkbox toggle
  const handleToggleOfficial = (id: string) => {
    if (!isEditing) return;

    setDevices(prev =>
      prev.map(d =>
        d.id === id ? { ...d, official: !d.official } : d
      )
    )
  }

  // Days badge
  const DaysBadge = ({ days }: { days?: string }) => {
    if (!days) return null;
    return (
      <span
        className="inline-block px-2 py-1 text-xs font-semibold rounded whitespace-nowrap"
        style={{
          color: RED_DARK,
          borderColor: RED_DARK,
          backgroundColor: RED_TINT,
          borderWidth: '1px',
        }}
      >
        {days}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status?: 'approved' | 'pending' }) => {
    if (!status || status === 'pending') return null;

    return (
      <div
        className="flex items-center justify-center w-5 h-5 rounded border"
        style={{
          borderColor: SUCCESS_GREEN,
          backgroundColor: SUCCESS_TINT,
        }}
      >
        <svg className="w-3 h-3" fill={SUCCESS_GREEN} viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 flex flex-col">

      <h2 className="text-lg font-semibold text-gray-900 px-6 py-4">
        Device Status
      </h2>

      <div className="overflow-auto max-h-[450px]">
        <table className="w-full text-xs">

          <thead className="sticky top-0 bg-white z-10">
            <tr className="bg-gray-50 border-b">
              <th className="px-4 py-2 text-left font-semibold">Device</th>
              <th className="px-4 py-2 text-center font-semibold">Official</th>
              <th className="px-4 py-2 text-left font-semibold">User</th>
              <th className="px-4 py-2 text-center font-semibold">App</th>
              <th className="px-4 py-2 text-center font-semibold">iOS</th>
              <th className="px-4 py-2 text-center font-semibold">App</th>
              <th className="px-4 py-2 text-center font-semibold">Con</th>
              <th className="px-4 py-2 text-center font-semibold">QM</th>
            </tr>
          </thead>

          <tbody>
            {devices.map((device) => (
              <tr
                key={device.id}
                className={`border-b transition-colors ${
                  isEditing
                    ? 'hover:bg-blue-100/50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <td className="px-4 py-2 font-medium">{device.name}</td>

                {/* FIXED CHECKBOX */}
                <td className="px-4 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={device.official}
                    onChange={() => handleToggleOfficial(device.id)}
                    disabled={!isEditing}
                    className={`w-4 h-4 rounded border-gray-400 text-blue-600
                      focus:ring-blue-500
                      ${isEditing ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                    `}
                  />
                </td>

                <td className="px-4 py-2">{device.user}</td>
                <td className="px-4 py-2 text-center">{device.appVersion}</td>
                <td className="px-4 py-2 text-center">{device.iosVersion}</td>

                <td className="px-4 py-2 text-center">
                  {device.appStatus ? <StatusBadge status={device.appStatus} /> : <DaysBadge days={device.appDays} />}
                </td>

                <td className="px-4 py-2 text-center">
                  {device.conStatus ? <StatusBadge status={device.conStatus} /> : <DaysBadge days={device.conDays} />}
                </td>

                <td className="px-4 py-2 text-center">
                  {device.qmStatus ? <StatusBadge status={device.qmStatus} /> : <DaysBadge days={device.qmDays} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-4 bg-gray-100 border-t flex space-x-3">

        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded"
              style={{ backgroundColor: ACTION_BLUE }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ACTION_BLUE_HOVER}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ACTION_BLUE}
            >
              Save
            </button>

            <button
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded border bg-white"
              style={{ color: ACTION_BLUE, borderColor: ACTION_BLUE }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ACTION_BLUE_TINT}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-medium rounded"
            style={{ backgroundColor: ACTION_BLUE }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ACTION_BLUE_HOVER}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ACTION_BLUE}
          >
            ✎ Edit
          </button>
        )}

      </div>
    </div>
  );
}
