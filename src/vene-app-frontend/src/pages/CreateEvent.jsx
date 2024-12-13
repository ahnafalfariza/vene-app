import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, CalendarCheck, Clock } from "lucide-react";
import clsx from "clsx";

const eventSchema = z.object({
  coverPhoto: z
    .instanceof(File)
    .nullable()
    .refine((file) => {
      if (!file) return false;
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }, "Please upload an image file (JPEG, PNG, or WebP)"),
  category: z.string().min(1, "Please select a category"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  eventName: z
    .string()
    .min(3, "Event name must be at least 3 characters")
    .max(100, "Event name must not exceed 100 characters"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters")
    .max(200, "Location must not exceed 200 characters"),
});

const CreateEvent = () => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      coverPhoto: null,
      category: "",
      description: "",
      eventName: "",
      date: "",
      time: "",
      location: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="flex-grow container w-full m-auto p-4 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="p-6">
          {/* Cover Photo Section */}
          <div className="mb-8">
            <div className="space-y-2">
              <Label htmlFor="coverPhoto">Cover Photo</Label>
              <p className="text-sm text-muted-foreground">
                Upload an eye-catching image for your event. Recommended size:
                1200x630px
              </p>
              <Controller
                name="coverPhoto"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="mt-2 relative h-64 bg-muted rounded-lg flex items-center justify-center">
                    {value && (
                      <img
                        src={URL.createObjectURL(value)}
                        alt="Cover preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    )}
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">
                        Drop your image here or click to upload
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files[0])}
                        className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              />
              {errors.coverPhoto && (
                <p className="text-sm text-destructive mt-2">
                  {errors.coverPhoto.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="space-y-6">
              <div>
                <Label htmlFor="eventName">Event name</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Choose a clear and memorable name for your event
                </p>
                <Input
                  {...register("eventName")}
                  placeholder="Enter event name"
                />
                {errors.eventName && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.eventName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="date">Date and Time</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Select when your event will take place
                </p>
                <div className="flex gap-2">
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={clsx(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(new Date(field.value), "PPP")
                              : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString())
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />

                  <div className="flex gap-2 items-center">
                    <Controller
                      name="time"
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 * 2 }).map((_, index) => {
                              const hour = Math.floor(index / 2);
                              const minute = index % 2 === 0 ? "00" : "30";
                              const time = `${hour
                                .toString()
                                .padStart(2, "0")}:${minute}`;
                              return (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </div>
                {(errors.date || errors.time) && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.date?.message || errors.time?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Enter the venue or address where the event will be held
                </p>
                <Input {...register("location")} placeholder="Enter location" />
                {errors.location && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.location.message}
                  </p>
                )}
                {/* Map placeholder */}
                <div className="h-40 bg-muted rounded-lg mt-3">
                  {/* Add your map component here */}
                </div>
              </div>

              <div>
                <Label htmlFor="category">Choose Category</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Select the category that best describes your event to help
                  attendees find it
                </p>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="art">Art</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Provide detailed information about your event, including what
                  attendees can expect
                </p>
                <Textarea
                  {...register("description")}
                  className="h-40"
                  placeholder="Tell us about your event"
                />
                {errors.description && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="mt-8">
                <Button type="submit" className="float-right w-full">
                  <CalendarCheck />
                  Create Event
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;