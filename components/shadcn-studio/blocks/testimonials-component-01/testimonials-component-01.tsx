"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { Rating } from '@/components/ui/rating'

export type TestimonialItem = {
  name: string
  role: string
  company: string
  avatar?: string
  rating?: number
  content: string
}

type TestimonialsComponentProps = {
  testimonials: TestimonialItem[]
  eyebrow?: string
  title?: string
  description?: string
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const TestimonialsComponent = ({
  testimonials,
  eyebrow = 'Customer voices',
  title = 'Trusted across fleets, insurers, and partner programs.',
  description = 'Redtail supports fleet operators, insurers, government teams, and connected vehicle programs that need dependable telematics and operational clarity.'
}: TestimonialsComponentProps) => {
  return (
    <section className='border-b border-black/10 bg-[#fcfbf9] py-16 sm:py-20 lg:py-24'>
      <Carousel
        className='mx-auto flex max-w-7xl gap-10 px-4 max-lg:flex-col sm:px-6 lg:items-center lg:gap-16 lg:px-8 xl:gap-20'
        opts={{
          align: 'start',
          slidesToScroll: 1
        }}
      >
        <div className='max-w-3xl lg:w-[38%] lg:max-w-md'>
          <p className='text-xs font-semibold tracking-[0.34em] text-rb-red uppercase'>
            {eyebrow}
          </p>
          <h2 className='mt-4 text-4xl leading-tight font-bold tracking-tight text-balance text-rb-black sm:text-5xl lg:text-[3.25rem]'>
            {title}
          </h2>
          <p className='mt-5 text-base leading-7 text-foreground/74 sm:text-lg'>
            {description}
          </p>

          <div className='mt-8 flex items-center gap-3'>
            <CarouselPrevious
              variant='outline'
              className='static translate-y-0 border-black/10 bg-white shadow-sm shadow-black/5 disabled:bg-white/60 disabled:text-foreground/35 disabled:opacity-100'
            />
            <CarouselNext
              variant='default'
              className='static translate-y-0 shadow-sm shadow-rb-red/20 disabled:border-rb-red/10 disabled:bg-rb-red/10 disabled:text-rb-red/35 disabled:opacity-100'
            />
          </div>
        </div>

        <div className='relative min-w-0 lg:w-[62%]'>
          <CarouselContent className='-ml-4 sm:-ml-5'>
            {testimonials.map(testimonial => (
              <CarouselItem key={testimonial.name} className='pl-4 sm:pl-5 md:basis-1/2'>
                <Card className='h-full rounded-2xl border border-black/10 bg-white shadow-sm shadow-black/5 ring-0 transition-colors duration-300 hover:border-rb-red/30'>
                  <CardHeader>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-11 bg-rb-peach text-rb-red after:border-black/8'>
                        {testimonial.avatar ? (
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        ) : null}
                        <AvatarFallback className='bg-rb-peach font-semibold text-rb-red'>
                          {getInitials(testimonial.name)}
                        </AvatarFallback>
                      </Avatar>

                      <div className='min-w-0'>
                        <CardTitle>{testimonial.name}</CardTitle>
                        <CardDescription className='leading-6'>
                          {testimonial.role} at{' '}
                          <span className='font-semibold text-rb-black'>
                            {testimonial.company}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className='flex flex-1 flex-col gap-5'>
                    {testimonial.rating ? (
                      <Rating readOnly variant='yellow' size={18} value={testimonial.rating} />
                    ) : null}
                    <blockquote className='text-base leading-7 text-foreground/82'>
                      “{testimonial.content}”
                    </blockquote>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  )
}

export default TestimonialsComponent
