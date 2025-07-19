"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxStudents: number;
  currentBookings: number;
}

interface ScheduleSettings {
  timezone: string;
  advanceBookingDays: number;
  sessionDuration: number;
  bufferTime: number;
}

export default function ScheduleManager() {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    {
      id: "1",
      day: "Monday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      maxStudents: 5,
      currentBookings: 2
    },
    {
      id: "2",
      day: "Tuesday",
      startTime: "10:00",
      endTime: "16:00",
      isAvailable: true,
      maxStudents: 4,
      currentBookings: 1
    },
    {
      id: "3",
      day: "Wednesday",
      startTime: "09:00",
      endTime: "17:00",
      isAvailable: true,
      maxStudents: 6,
      currentBookings: 4
    },
    {
      id: "4",
      day: "Thursday",
      startTime: "11:00",
      endTime: "15:00",
      isAvailable: false,
      maxStudents: 3,
      currentBookings: 0
    },
    {
      id: "5",
      day: "Friday",
      startTime: "09:00",
      endTime: "14:00",
      isAvailable: true,
      maxStudents: 4,
      currentBookings: 3
    }
  ]);

  const [settings, setSettings] = useState<ScheduleSettings>({
    timezone: "UTC-5",
    advanceBookingDays: 14,
    sessionDuration: 60,
    bufferTime: 15
  });

  const [editingSlot, setEditingSlot] = useState<string | null>(null);
  const [newSlot, setNewSlot] = useState({
    day: "",
    startTime: "",
    endTime: "",
    maxStudents: 1
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const toggleAvailability = (id: string) => {
    setTimeSlots(slots =>
      slots.map(slot =>
        slot.id === id ? { ...slot, isAvailable: !slot.isAvailable } : slot
      )
    );
  };

  const deleteSlot = (id: string) => {
    setTimeSlots(slots => slots.filter(slot => slot.id !== id));
  };

  const updateSlot = (id: string, updates: Partial<TimeSlot>) => {
    setTimeSlots(slots =>
      slots.map(slot =>
        slot.id === id ? { ...slot, ...updates } : slot
      )
    );
    setEditingSlot(null);
  };

  const addNewSlot = () => {
    if (newSlot.day && newSlot.startTime && newSlot.endTime) {
      const slot: TimeSlot = {
        id: Date.now().toString(),
        ...newSlot,
        isAvailable: true,
        currentBookings: 0
      };
      setTimeSlots(slots => [...slots, slot]);
      setNewSlot({ day: "", startTime: "", endTime: "", maxStudents: 1 });
      setShowAddForm(false);
    }
  };

  const getAvailabilityStatus = (slot: TimeSlot) => {
    if (!slot.isAvailable) return { status: "Unavailable", color: "text-gray-500" };
    if (slot.currentBookings >= slot.maxStudents) return { status: "Fully Booked", color: "text-red-600" };
    if (slot.currentBookings > 0) return { status: "Partially Booked", color: "text-yellow-600" };
    return { status: "Available", color: "text-green-600" };
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 pb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Schedule Management
              </h1>
              <p className="text-gray-600 text-lg font-light">
                Manage your availability and session settings
              </p>
            </div>
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Time Slot
            </Button>
          </div>
        </header>

        {/* Settings Card */}
        <section>
          <Card className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-gray-900">
                Schedule Settings
              </CardTitle>
              <CardDescription className="text-gray-600">
                Configure your general availability preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Timezone</Label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-600 w-full"
                  >
                    <option value="UTC-5">UTC-5 (EST)</option>
                    <option value="UTC-8">UTC-8 (PST)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC+1">UTC+1 (CET)</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Advance Booking (days)</Label>
                  <Input
                    type="number"
                    value={settings.advanceBookingDays}
                    onChange={(e) => setSettings(prev => ({ ...prev, advanceBookingDays: Number(e.target.value) }))}
                    className="h-12 border-gray-300 focus:border-blue-600"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Session Duration (min)</Label>
                  <Input
                    type="number"
                    value={settings.sessionDuration}
                    onChange={(e) => setSettings(prev => ({ ...prev, sessionDuration: Number(e.target.value) }))}
                    className="h-12 border-gray-300 focus:border-blue-600"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-900">Buffer Time (min)</Label>
                  <Input
                    type="number"
                    value={settings.bufferTime}
                    onChange={(e) => setSettings(prev => ({ ...prev, bufferTime: Number(e.target.value) }))}
                    className="h-12 border-gray-300 focus:border-blue-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Add New Slot Form */}
        {showAddForm && (
          <section>
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-medium text-gray-900">
                    Add New Time Slot
                  </CardTitle>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAddForm(false)}
                    className="p-2 hover:bg-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-900">Day</Label>
                    <select
                      value={newSlot.day}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, day: e.target.value }))}
                      className="h-12 px-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-blue-600 w-full"
                    >
                      <option value="">Select Day</option>
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-900">Start Time</Label>
                    <Input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                      className="h-12 border-gray-300 focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-900">End Time</Label>
                    <Input
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                      className="h-12 border-gray-300 focus:border-blue-600"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-900">Max Students</Label>
                    <Input
                      type="number"
                      min="1"
                      value={newSlot.maxStudents}
                      onChange={(e) => setNewSlot(prev => ({ ...prev, maxStudents: Number(e.target.value) }))}
                      className="h-12 border-gray-300 focus:border-blue-600"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={addNewSlot}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Add Slot
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Time Slots */}
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8">Weekly Schedule</h2>
          <div className="space-y-4">
            {timeSlots.map((slot) => {
              const { status, color } = getAvailabilityStatus(slot);
              const isEditing = editingSlot === slot.id;

              return (
                <Card key={slot.id} className="bg-gray-50 border-0 hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-gray-600" />
                          <span className="font-medium text-gray-900 text-lg">
                            {slot.day}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">
                              {slot.currentBookings}/{slot.maxStudents} booked
                            </span>
                          </div>
                        </div>

                        <div className={`flex items-center gap-1 ${color}`}>
                          {slot.isAvailable ? (
                            slot.currentBookings >= slot.maxStudents ? (
                              <AlertCircle className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                          <span className="text-sm font-medium">{status}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAvailability(slot.id)}
                          className={`border-gray-300 hover:bg-gray-50 ${
                            slot.isAvailable ? 'text-gray-700' : 'text-green-600'
                          }`}
                        >
                          {slot.isAvailable ? 'Disable' : 'Enable'}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSlot(slot.id)}
                          className="border-gray-300 hover:bg-gray-50 px-3"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteSlot(slot.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50 px-3"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Edit Form */}
                    {isEditing && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-900">Start Time</Label>
                            <Input
                              type="time"
                              defaultValue={slot.startTime}
                              onChange={(e) => updateSlot(slot.id, { startTime: e.target.value })}
                              className="h-10 border-gray-300 focus:border-blue-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-900">End Time</Label>
                            <Input
                              type="time"
                              defaultValue={slot.endTime}
                              onChange={(e) => updateSlot(slot.id, { endTime: e.target.value })}
                              className="h-10 border-gray-300 focus:border-blue-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-900">Max Students</Label>
                            <Input
                              type="number"
                              min="1"
                              defaultValue={slot.maxStudents}
                              onChange={(e) => updateSlot(slot.id, { maxStudents: Number(e.target.value) })}
                              className="h-10 border-gray-300 focus:border-blue-600"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => setEditingSlot(null)}
                            className="border-gray-300 hover:bg-gray-50"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => setEditingSlot(null)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium"
                          >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Summary */}
        <section>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Schedule Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Slots:</span>
                      <span className="ml-2 font-medium text-gray-900">{timeSlots.length}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Active Slots:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {timeSlots.filter(slot => slot.isAvailable).length}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Bookings:</span>
                      <span className="ml-2 font-medium text-gray-900">
                        {timeSlots.reduce((sum, slot) => sum + slot.currentBookings, 0)}
                      </span>
                    </div>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 font-medium">
                  Save Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
