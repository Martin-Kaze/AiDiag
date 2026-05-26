import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export function CustAvatarGroup( props : any ) {
 
  return (
    <AvatarGroup >
      <Avatar size="lg">
        <AvatarImage src={props.data[0].snippet.thumbnails.default.url} alt={props.data[0].snippet.title} />
        <AvatarFallback>{props.data[0].snippet.title[0]}</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src={props.data[1].snippet.thumbnails.default.url} alt={props.data[1].snippet.title} />
        <AvatarFallback>{props.data[1].snippet.title[0]}</AvatarFallback>
      </Avatar >
      <Avatar size="lg">
     <AvatarImage src={props.data[2].snippet.thumbnails.default.url} alt={props.data[2].snippet.title} />
        <AvatarFallback>{props.data[2].snippet.title[0]}</AvatarFallback>

      </Avatar>
      {(props.data.length > 3) ? 
      <AvatarGroupCount>{`+` + (props.data.length - 3 ) }</AvatarGroupCount> :
    null
      }
    </AvatarGroup>
  )
}
