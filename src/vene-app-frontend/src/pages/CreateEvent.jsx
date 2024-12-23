import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ToastAction } from "@/components/ui/toast";
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
import { CalendarIcon, CalendarCheck, Clock, Loader2 } from "lucide-react";
import clsx from "clsx";
import { CategoryData } from "../components/category";
import { uploadFile } from "@junobuild/core";
import { useAuth } from "../components/auth";
import { createEvent } from "../services/EventService";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router";
import { formatEventUrl } from "../utils/common";

const eventSchema = z.object({
  coverPhoto: z
    .instanceof(File)
    .nullable()
    .refine((file) => {
      if (!file) return false;
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type);
    }, "Please upload an image file (JPEG, PNG, or WebP)"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(20, "Description must be at least 20 characters"),
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
  ticketType: z.enum(["free", "paid"], {
    required_error: "Please select a ticket type",
  }),
  ticketPrice: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const number = parseFloat(val);
        return !isNaN(number) && number >= 0;
      },
      { message: "Please enter a valid price" }
    ),
});

const CreateEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
      ticketType: "",
      ticketPrice: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted:", data);
      setIsSubmitting(true);

      const filename = `${user.key}-${data.coverPhoto.name}`;
      const { downloadUrl } = await uploadFile({
        collection: "image",
        data: data.coverPhoto,
        filename,
      });
      const url = downloadUrl;

      const date = new Date(data.date);
      const time = data.time.split(":");
      date.setHours(time[0], time[1]);

      const isoDate = date.getTime() * 1000000;

      const res = await createEvent({
        category: data.category,
        coverPhoto: url,
        description: data.description,
        eventName: data.eventName,
        location: data.location,
        eventDate: isoDate,
        ticketType: data.ticketType,
        ticketPrice: data.ticketPrice,
        maxParticipants: 100,
      });

      console.log("Event created:", res);

      toast({
        title: "Success!",
        description: "Your event has been created successfully.",
        action: (
          <ToastAction
            altText="Goto schedule to event page"
            onClick={() => navigate(formatEventUrl(data.eventName, res.ok))}
          >
            Go to page
          </ToastAction>
        ),
      });
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ticketType = watch("ticketType");

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
                  <div className="mt-2 relative aspect-[2/1] w-full bg-muted rounded-lg flex items-center justify-center">
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
                        {CategoryData.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.text}
                          </SelectItem>
                        ))}
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
              <div>
                <Label htmlFor="ticketType">Ticket Type</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Specify if your event is free or paid
                </p>
                <Controller
                  name="ticketType"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ticket type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.ticketType && (
                  <p className="text-xs text-destructive mt-1.5">
                    {errors.ticketType.message}
                  </p>
                )}
              </div>

              {ticketType === "paid" && (
                <div>
                  <Label htmlFor="ticketPrice">Ticket Price</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Set the price for your event tickets
                  </p>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      $
                    </span>
                    <Input
                      {...register("ticketPrice")}
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      className="pl-7"
                    />
                  </div>
                  {errors.ticketPrice && (
                    <p className="text-xs text-destructive mt-1.5">
                      {errors.ticketPrice.message}
                    </p>
                  )}
                </div>
              )}
              <div className="mt-8">
                <Button
                  type="submit"
                  className="float-right"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="mr-2 h-4 w-4" />
                      Create Event
                    </>
                  )}
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
